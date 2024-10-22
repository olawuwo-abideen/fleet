// mail.service.ts
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('MAIL_HOST'),
      port: configService.get('PORT'),
      auth: {
        user: configService.get('MAIL_FROM_ADDRESS'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://yourapp.com/reset-password?token=${token}`;
    const mailOptions = {
      from: 'Auth-backend service',
      to: to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}















// import { Injectable, BadRequestException, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { createTransport } from 'nodemailer';
// import * as Mail from 'nodemailer/lib/mailer';
// import { User } from 'src/auth/schemas/user.schema';

// @Injectable()
// export class EmailService {
//   private readonly logger = new Logger(EmailService.name);
//   private nodemailerTransport: Mail;

//   constructor(
//     private readonly configService: ConfigService
//   ) {
//     this.nodemailerTransport = createTransport({
//       host: configService.get('MAIL_HOST'),
//       port: configService.get('MAIL_PORT'),
//       secure: true,
//       auth: {
//         user: configService.get('MAIL_FROM_ADDRESS'),
//         pass: configService.get('MAIL_PASSWORD'),
//       },
//     });
//   }

//   private sendMail(options: Mail.Options) {
//     this.logger.log('Email sent out to', options.to);
//     return this.nodemailerTransport.sendMail(options);
//   }

//   public async sendResetPasswordLink(user: User): Promise<void> {
//     try {
//       console.log(user);
//       const url = `${this.configService.get('EMAIL_RESET_PASSWORD_URL')}/${user.resetToken}`;

//       const text = `Hi, \nHere is your reset password link: ${url}`;

//       await this.sendMail({
//         from: this.configService.get('MAIL_FROM_ADDRESS'),
//         to: user.email,
//         subject: 'Reset password',
//         text,
//       });
//     } catch (error) {
//       this.logger.error(error);

//       throw new BadRequestException('Internal server errors');
//     }
//   }


//   public async sendUserWelcome(user: User): Promise<void> {
//     try {
//       console.log(user);
//       const text = `Hi, \nWelcome to the fleetmanagement app`;

//       await this.sendMail({
//         from: this.configService.get('MAIL_FROM_ADDRESS'),
//         to: user.email,
//         subject: 'FleetManagementapp',
//         text,
//       });
//     } catch (error) {
//       this.logger.error(error);

//       throw new BadRequestException('Internal server errors');
//     }
//   }
// }

