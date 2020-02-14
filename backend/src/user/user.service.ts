import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../types/user';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import {MailerService} from '@nest-modules/mailer';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly mailerService: MailerService) {}

    sanitizeUser(user: User) {
        // @ts-ignore
        const sanitized = user.toObject();
        delete sanitized.password;
        return sanitized;
    }

    async create(userDTO: CreateUserDto) {
        const {email, firstName, lastName} = userDTO;
        const user = await this.userModel.findOne({email});
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        this.mailerService
            .sendMail({
                to: 'andrey_288@mail.ru',
                from: 'andromeda@gmail.com',
                subject: 'Registration for "Andromeda System"',
                text: 'Registration',
                html: `<b>Hi, ${firstName} ${lastName}! You are successfully registered!</b>`,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });

        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async getUser(userID) {
        const user = await this.userModel.findById(userID).exec();
        return this.sanitizeUser(user);
    }

    async updateUser(userID, body) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userID, body, { new: true });
        return this.sanitizeUser(updatedUser);
    }

    async findByLogin(userDTO: LoginUserDto) {
        const {email, password} = userDTO;
        const user = await this.userModel.findOne({email});
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    async findByPayload(payload: any) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
    }
}
