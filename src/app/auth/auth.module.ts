  import { Module } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { JwtModule } from '@nestjs/jwt';
  import { MongooseModule } from '@nestjs/mongoose';
  import { PassportModule } from '@nestjs/passport';
  import { AuthController } from './controllers/auth.controller';
  import { AuthService } from '../auth/services/auth.service';
  import { JwtStrategy } from './strategy/jwt.strategy';
  import { EmailService } from '../../shared/email/email.service';
  import { ResetToken, ResetTokenSchema } from './schemas/reset-token.schema';
  import { User, UserSchema  } from './schemas/user.schema';
  import { UserService } from '../user/services/user.service';

  @Module({
  imports: [
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
  return {
  secret: config.get<string>('JWT_SECRET'),
  signOptions: {
  expiresIn: config.get<string | number>('JWT_EXPIRES'),
  },
  };
  },
  }),
  MongooseModule.forFeature([
  { name:User.name, schema: UserSchema },     
  {name: ResetToken.name,schema: ResetTokenSchema,   
  },
  ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmailService, UserService],
  exports: [JwtStrategy, PassportModule, AuthService],
  })
  export class AuthModule {}

