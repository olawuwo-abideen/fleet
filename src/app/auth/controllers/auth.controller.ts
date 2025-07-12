import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { User } from '../../../shared/schemas/user.schema';
import { Response } from 'express';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiResponseDto } from 'src/shared/dto/api-response';

@ApiTags('Auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'User Sign-Up' })
  @ApiBody({ type: SignUpDto, description: 'User Sign-Up Data' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User successfully signed up.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data.' })
  async signUp(@Body() signUpDto: SignUpDto) {
    const result = await this.authService.signUp(signUpDto);
    return new ApiResponseDto('User signed up successfully', result);
  }

  @Post('/login')
  @ApiOperation({ summary: 'User Log-In' })
  @ApiBody({ type: LoginDto, description: 'User Log-In Data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully signed in. Access token generated.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials.' })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return new ApiResponseDto('User logged in successfully', result);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'User Forgot Password' })
  @ApiBody({ type: ForgotPasswordDto, description: 'User email' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Password reset link sent to email.' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(forgotPasswordDto.email);
    return new ApiResponseDto(`Reset password link sent to ${forgotPasswordDto.email}`, result);
  }

  @Put('reset-password')
  @ApiOperation({ summary: 'User Reset Password' })
  @ApiBody({ type: ResetPasswordDto, description: 'User reset password' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User password reset.' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(resetPasswordDto);
    return new ApiResponseDto('Password reset successfully', result);
  }

  @Post('sign-out')
  @ApiOperation({ summary: 'User Log-Out' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully signed out.' })
  async signOut(user: Partial<User>, @Res() res: Response) {
    await this.authService.logout(user, res);
    return res.status(HttpStatus.OK).json(new ApiResponseDto('User signed out successfully', null));
  }
}
