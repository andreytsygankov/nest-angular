import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from '../user/user.module';
import {JwtStrategy} from './jwt.strategy';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
    imports: [
        UserModule,
        ClientsModule.register([
            {
                name: `${process.env.REDIS_NAME}`,
                transport: Transport.REDIS,
                options: {
                    url: process.env.REDIS,
                },
            },
        ]),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {
}
