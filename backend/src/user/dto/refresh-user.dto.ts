import {ApiProperty} from '@nestjs/swagger';

export class RefreshUserDto {
    @ApiProperty()
    readonly refresh: string;
}
