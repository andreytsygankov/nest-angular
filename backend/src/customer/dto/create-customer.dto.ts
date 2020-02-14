import {ApiProperty} from '@nestjs/swagger';

export class CreateCustomerDTO {
    @ApiProperty()
    readonly first_name: string;
    @ApiProperty()
    readonly last_name: string;
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly phone: string;
    @ApiProperty()
    readonly address: string;
    @ApiProperty()
    readonly description: string;
    readonly created_at: Date;
    readonly user: string;
}