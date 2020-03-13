import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signPayload(payload: Payload) {
        return sign(payload, `${process.env.SECRET_KEY}`, { expiresIn: `${process.env.TOKEN_LIFE}`});
    }

    async signPayloadRefresh(payload: Payload) {
        return sign(payload, `${process.env.SECRET_KEY_REFRESH}`, { expiresIn: `${process.env.TOKEN_LIFE_REFRESH}`});
    }

    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload);
    }
}
