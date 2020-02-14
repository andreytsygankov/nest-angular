import { IsEmail, IsNotEmpty } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
export class UserDto {
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly firstName: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly address: string;
}
