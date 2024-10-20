import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    UserModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USERNAME'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"Fleetmanagement" <${config.get('MAIL_USERNAME')}>`,
        },

      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],

  exports: [EmailService],
})
export class EmailModule {}
