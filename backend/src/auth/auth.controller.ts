import {Controller, Post, Body, Get, UseGuards, Request, Inject} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from '../types/payload';
import { CreateUserDto } from '../user/dto/create-user.dto';
import {ClientProxy} from '@nestjs/microservices';
import {RefreshUserDto} from "../user/dto/refresh-user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        @Inject(`${process.env.REDIS_NAME}`) private readonly client: ClientProxy,
        ) {}

    async onApplicationBootstrap() {
        // Connect your client to the redis server on startup.
        await this.client.connect();
        console.log(`The module has been initialized.`);
    }

    @Post('login')
    async login(@Body() userDTO: LoginUserDto) {
        const user = await this.userService.findByLogin(userDTO);
        const payload: Payload = {
            email: user.email,
        };
        const expiredAt = new Date(new Date().getTime() + parseInt(process.env.TOKEN_LIFE, 10)).toISOString();
        const token = await this.authService.signPayload(payload);
        const refreshToken = await this.authService.signPayloadRefresh(payload);
        const payloadUser = {
          id: user._id,
          refreshToken,
        };
        this.client.send<number>('user_login', payloadUser);
        console.log(payloadUser);
        return { user, token, expiredAt, refreshToken };
    }

    @Post('refresh')
    async refresh(@Body() refresh: RefreshUserDto) {

    }

    @Post('register')
    async register(@Body() userDTO: CreateUserDto) {
        const user = await this.userService.create(userDTO);
        const payload: Payload = {
            email: user.email,
        };

        return { message: 'User has been succesfully created!' };
    }
}
