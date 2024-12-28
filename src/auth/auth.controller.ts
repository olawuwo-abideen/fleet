import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
import { ChangePasswordDto } from './dto/change-password.dto';


@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}

@Post('/signup')
signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
return this.authService.signUp(signUpDto);
}

@Post('/login')
login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
return this.authService.login(loginDto);
}

@Post('forgot-password')
async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
return this.authService.forgotPassword(forgotPasswordDto.email);
}

@Put('reset-password')
async resetPassword(
@Body() resetPasswordDto: ResetPasswordDto,
) {
return this.authService.resetPassword(
resetPasswordDto
);
}

@Put('change-password')
@UseGuards(AuthGuard(), RolesGuard)
async changePassword(
@Body() payload: ChangePasswordDto,
@Req() req,
) {
return this.authService.changePassword(
req.userId,
payload

);
}

}

