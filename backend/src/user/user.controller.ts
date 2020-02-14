import {
    Controller,
    Get,
    Res,
    Req,
    HttpStatus,
    Post,
    Body,
    Put,
    Query,
    NotFoundException,
    Delete,
    Param,
    UsePipes, UseFilters, UseGuards,
    Request, UseInterceptors, ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {UserService} from './user.service';
import {UserDto} from './dto/user.dto';
import {ApiBearerAuth} from '@nestjs/swagger';
import {ApiImplicitParam} from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';

@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private userService: UserService) { }

    @Get('user/:userID')
    @ApiImplicitParam({ name: 'userID' })
    async getUser(@Param('userID') userID) {
        const user = await this.userService.getUser(userID);
        if (!user) throw new NotFoundException('User does not exist!');
        return user;
    }

    @Put('update')
    async updateUser(@Query('userID') userID, @Body() userDTO: UserDto) {
        const user = await this.userService.updateUser(userID, userDTO);
        if (!user) throw new NotFoundException('Customer does not exist!');
        return {message: 'User has been successfully updated'};
    }

}
