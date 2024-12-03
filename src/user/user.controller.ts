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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
    
  @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllUser(): Promise<User[]>{
      return this.userService.findAll()
  }

    @Get(':id')
    @Roles(Role.Admin, Role.Driver)
    @UseGuards(AuthGuard(), RolesGuard)
    async getUser(
      @Param('id')
      id: string,
    ): Promise<User> {
      return this.userService.findById(id);
    }
  
    @Put(':id')
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
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deleteUser(
      @Param('id')
      id: string,
    ): Promise<{ message: string }> {
      return this.userService.deleteById(id);
    }

    @Put('upload/:id')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('files'))
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
