import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema } from '../models/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {UserController} from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
})
export class UserModule {}
