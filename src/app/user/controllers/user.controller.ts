import {
Body,
Controller,
Get,
HttpStatus,
Put,
UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { User } from '../../../shared/schemas/user.schema';
import { UserService } from '../services/user.service';
import {
ApiBearerAuth,
ApiBody,
ApiOperation,
ApiResponse,
ApiTags,
} from '@nestjs/swagger';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CurrentUser } from '../../../shared/decorators/user.decorator';
import { ApiResponseDto } from '../../../shared/dto/api-response';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
constructor(private userService: UserService) {}

@Get('')
@ApiOperation({ summary: 'Get current user profile' })
@ApiResponse({
status: HttpStatus.OK,
description: 'User profile retrieved successfully.',
})
@UseGuards(RolesGuard)
async getProfile(@CurrentUser() user: User) {
const data = await this.userService.profile(user);
return new ApiResponseDto('User profile retrieved successfully', data);
}

@Put('')
@ApiOperation({ summary: 'Update user profile' })
@ApiBody({ type: UpdateUserDto, description: 'Update user profile data' })
@ApiResponse({
status: HttpStatus.OK,
description: 'User profile updated successfully',
})
@UseGuards(AuthGuard())
async updateProfile(
@Body() payload: UpdateUserDto,
@CurrentUser() user: User,
) {
const data = await this.userService.updateProfile(payload, user);
return new ApiResponseDto('User profile updated successfully', data);
}

@Put('change-password')
@ApiOperation({ summary: 'User change password' })
@ApiBody({ type: ChangePasswordDto, description: 'Change user password' })
@ApiResponse({
status: HttpStatus.OK,
description: 'User password updated successfully',
})
@UseGuards(AuthGuard(), RolesGuard)
async changePassword(
@CurrentUser() user: User,
@Body() payload: ChangePasswordDto,
) {
await this.userService.changePassword(user, payload);
return new ApiResponseDto('User password updated successfully', null);
}




}
