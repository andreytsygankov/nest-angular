import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {CustomerModule} from './customer/customer.module';
import {LoggerMiddleware} from './middleware/logger.middleware';
import {CustomerController} from './customer/customer.controller';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {TransformInterceptor} from './interceptors/transform.interceptor';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {HandlebarsAdapter, MailerModule} from '@nest-modules/mailer';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(`mongodb://localhost/${process.env.DATABASE_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
        MailerModule.forRoot({
            transport: 'smtps://testmagora@gmail.com:Sharim321@smtp.gmail.com',
            defaults: {
                from: 'Registration for "Andromeda System" <andromeda@gmail.com>',
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        // ClientsModule.register([
        //     {
        //         name: process.env.REDIS_NAME,
        //         transport: Transport.REDIS,
        //         options: {
        //             url: process.env.REDIS,
        //         },
        //     },
        // ]),
        CustomerModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
    ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//         consumer
//             .apply(LoggerMiddleware)
//             // .forRoutes(CustomerController);
//             .forRoutes('auth');
//     }
// }
