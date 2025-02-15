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
import { VehicleService } from '../services/vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from '../dto/vehicle.dto';
import { Vehicle } from '../schemas/vehicle.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
constructor(private vehicleService: VehicleService) {}

@Get()
@ApiOperation({ summary: 'Get all vehicle' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async getAllVehicles(): Promise<Vehicle[]>{
return this.vehicleService.findAll()
}

@Post()
@ApiOperation({ summary: 'Create vehicle' })
@ApiBody({ type: CreateVehicleDto, description: 'Vehicle Data' })
@ApiResponse({
  status: HttpStatus.CREATED,
  description:
    'Data Successfully created',
})
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
@ApiOperation({ summary: 'Get all vehicle' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
@Roles(Role.Driver, Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async getVehicle(
@Param('id')
id: string,
): Promise<Vehicle> {
return this.vehicleService.findById(id);
}

@Put(':id')
@ApiOperation({ summary: 'Update vehicle data by id' })
@ApiBody({ type: UpdateVehicleDto, description: 'Vehicle Data' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data updated successfully',
})
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
@ApiOperation({ summary: 'Delete vehicle data by id' })
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async deleteVehicle(
@Param('id')
id: string,
): Promise<{ deleted: boolean }> {
return this.vehicleService.deleteById(id);
}

@Put('upload/:id')
@ApiOperation({ summary: 'Update vehicle data by id' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data updated successfully',
})
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
