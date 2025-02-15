  import {
  Body,
  Controller,
  Request,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
  } from '@nestjs/common';
  import { UpdateUserDto } from '../dto/update-user.dto';
  import { AuthGuard } from '@nestjs/passport';;
  import { RolesGuard } from '../../auth/guards/roles.guard';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { User } from '../../auth/schemas/user.schema';
  import { UserService } from '../services/user.service';
  import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
  
  @ApiBearerAuth()
  @ApiTags('User')
  @Controller('user')
  export class UserController {
  constructor(private userService: UserService) {}


    @Get('')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ 
  status: HttpStatus.OK,
  description:
  'User profile retrieve successfully.',
  })
  @UseGuards(AuthGuard())
  async getProfile(@CurrentUser() user: User) {
  return await this.userService.profile(user);
  }

  @Put('')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ type: UpdateUserDto, description: 'Update user profile data' })
  @ApiResponse({
  status: HttpStatus.OK,
  description:
  'User profile updated successfully',
  })
  @UseGuards(AuthGuard ())
  public async updateProfile(
  @Body() payload: UpdateUserDto,
  @CurrentUser() user: User,
  ) {
  return await this.userService.updateProfile(payload, user);
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
    @CurrentUser() user: User,
  @Body() payload: ChangePasswordDto,

  ) {
  return this.userService.changePassword(
  user,
  payload
  
  )
  }


  }
