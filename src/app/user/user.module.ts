  import { Module } from '@nestjs/common';
  import { UserController } from './controllers/user.controller';
  import { UserService } from './services/user.service';
  import { MongooseModule } from '@nestjs/mongoose';
  import { PassportModule } from '@nestjs/passport';
  import {User, UserSchema} from '../auth/schemas/user.schema'

  @Module({
  imports: [
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  PassportModule.register({ defaultStrategy: 'jwt' }), 
  ],
  controllers: [UserController],
  providers: [UserService],
  })
  export class UserModule {}
