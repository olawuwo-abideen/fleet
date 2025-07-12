  import { Module } from '@nestjs/common';
  import { UserController } from './controllers/user.controller';
  import { UserService } from './services/user.service';
  import { MongooseModule } from '@nestjs/mongoose';
  import { PassportModule } from '@nestjs/passport';
  import {User, UserSchema} from '../../shared/schemas/user.schema'
import { AuthModule } from '../auth/auth.module';

  @Module({
  imports: [
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  AuthModule,
  PassportModule.register({ defaultStrategy: 'jwt' }), 
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
  })
  export class UserModule {}
