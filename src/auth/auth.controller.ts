import { Body, Controller, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import {  Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}

@Post('/signup')
@ApiOperation({ summary: 'User Sign-Up' })
@ApiBody({ type: SignUpDto, description: 'User Sign-Up Data' })
@ApiResponse({
  status: HttpStatus.CREATED,
  description:
    'User successfully signed up.',
})
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data.' })
signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
return this.authService.signUp(signUpDto);
}

@Post('/login')
@ApiOperation({ summary: 'User Log-In' })
@ApiBody({ type: LoginDto, description: 'User Log-In Data' })
@ApiResponse({
  status: HttpStatus.OK,
  description: 'User successfully signed in. Access token generated.',
})
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Invalid credentials.',
})
login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
return this.authService.login(loginDto);
}

@Post('forgot-password')
@ApiOperation({ summary: 'User Forgot password' })
@ApiBody({ type: ForgotPasswordDto, description: 'User email' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'User Forgot password,Input email to reset',
})
async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
return this.authService.forgotPassword(forgotPasswordDto.email);
}

@Put('reset-password')
@ApiOperation({ summary: 'User Reset Pasword' })
@ApiBody({ type: ResetPasswordDto, description: 'User reset password' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'User Password Reset.',
})
async resetPassword(
@Body() resetPasswordDto: ResetPasswordDto,
) {
return this.authService.resetPassword(
resetPasswordDto
);
}

@Put('change-password')
@ApiOperation({ summary: 'User change password' })
@ApiBody({ type: ChangePasswordDto, description: 'Change user password' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'User Password updated successfully',
})
@UseGuards(AuthGuard(), RolesGuard)
async changePassword(
@Body() payload: ChangePasswordDto,
@Req() req,
) {
return this.authService.changePassword(
req.userId,
payload

)
}

@Post('sign-out')
@ApiOperation({ summary: 'User Log-Out' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'User successfully signed out. Refresh token cleared from the cookie.',
})
async signOut(user: Partial<User>, @Res() res: Response) {
  return await this.authService.logout(user, res);
}

}

