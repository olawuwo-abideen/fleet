import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Post,
    Put,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './schemas/vehicle.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('vehicle')
export class VehicleController {
constructor(private vehicleService: VehicleService) {}
    
  @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllVehicles(): Promise<Vehicle[]>{
      return this.vehicleService.findAll()
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async createVehicle(
    @Body()
    vehicle: CreateVehicleDto,
    @Req() req,
  ): Promise<Vehicle> {
    return this.vehicleService.create(vehicle, req.user);
  }

  @Get(':id')
  @Roles(Role.Driver, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getVehicle(
    @Param('id')
    id: string,
  ): Promise<Vehicle> {
    return this.vehicleService.findById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateVehicle(
    @Param('id')
    id: string,
    @Body()
    vehicle: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleService.updateById(id, vehicle);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async deleteVehicle(
    @Param('id')
    id: string,
  ): Promise<{ deleted: boolean }> {
    return this.vehicleService.deleteById(id);
  }

  @Put('upload/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
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
    return this.vehicleService.uploadImages(id, files);
  }

}
