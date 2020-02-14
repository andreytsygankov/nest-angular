import { IsEmail, IsNotEmpty } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
export class UserIDDto {
    @ApiProperty()
    userID: string;
}
