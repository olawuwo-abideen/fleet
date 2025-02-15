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
from: 'Fleet Management',
to: to,
subject: 'Password Reset Request',
html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
};

await this.transporter.sendMail(mailOptions);
}
}
