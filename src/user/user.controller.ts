import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { User } from 'src/auth/schemas/user.schema';

@Controller('user')
export class UserController {
    // constructor(private readonly userService: UserService) {}

    // @Get('')
    // async getProfile(@Request() req: RequestWithUser) {
    //   return await this.userService.profile(req.user);
    // }
  
    // @Post('change-password')
    // public async changePassword(
    //   @Body() payload: ChangePasswordDto,
    //   @CurrentUser() user: User,
    // ) {
    //   return await this.userService.changePassword(payload, user);
    // }


    // @Put('')
    // public async updateProfile(
    //   @Body() payload: UpdateProfileDto,
    //   @CurrentUser() user: User,
    // ) {
    //   return await this.userService.updateProfile(payload, user);
    // }



}
