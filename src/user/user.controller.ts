  import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
  } from '@nestjs/common';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { AuthGuard } from '@nestjs/passport';
  import { Roles } from 'src/auth/decorators/roles.decorator';
  import { Role } from 'src/auth/enums/role.enum';
  import { RolesGuard } from 'src/auth/guards/roles.guard';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { User } from 'src/auth/schemas/user.schema';
  import { UserService } from './user.service';
  import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  
  @ApiBearerAuth()
  @ApiTags('user')
  @Controller('user')
  export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllUser(): Promise<User[]>{
  return this.userService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
  @Roles(Role.Admin, Role.Driver)
  @UseGuards(AuthGuard(), RolesGuard)
  async getUser(
  @Param('id')
  id: string,
  ): Promise<User> {
  return this.userService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiBody({ type: UpdateUserDto, description: 'User Data' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data updated successfully',
})
  @Roles(Role.Admin, Role.Driver)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateUser(
  @Param('id')
  id: string,
  @Body(new ValidationPipe({ transform: true, whitelist: true }))
  data: UpdateUserDto,
  ): Promise<User> {
  return this.userService.updateById(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Data deleted successfully.',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async deleteUser(
  @Param('id')
  id: string,
  ): Promise<{ message: string }> {
  return this.userService.deleteById(id);
  }

  @Put('upload/:id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update user image' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data updated successfully',
})
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImages(
  @Param('id') id: string,
  @UploadedFiles(
  new ParseFilePipeBuilder()
  .addFileTypeValidator({
  fileType: /(jpg|jpeg|png)$/,
  })
  .addMaxSizeValidator({
  maxSize: 1000 * 1000,
  message: 'File size must be less than 1MB',
  })
  .build({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  }),
  )
  files: Array<Express.Multer.File>,
  ) {
  return this.userService.uploadImages(id, files);
  }


  }
