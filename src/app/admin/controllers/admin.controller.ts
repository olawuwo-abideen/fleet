import {
Body,
Controller,
Delete,
Get,
HttpStatus,
Param,
ParseFilePipeBuilder,
Patch,
Post,
Put,
UploadedFiles,
UseGuards,
UseInterceptors,
} from '@nestjs/common';
import {
ApiBearerAuth,
ApiBody,
ApiConsumes,
ApiOperation,
ApiTags,
} from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { CreateVehicleDto, UpdateVehicleDto } from '../dto/vehicle.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/shared/decorators/public.decorator';
import { AdminLoginDto } from '../dto/admin.dto';
import { ApiResponseDto } from 'src/shared/dto/api-response';
import { AdminAuthGuard } from '../guard/adminguard';

@UseGuards(AdminAuthGuard)
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
constructor(private adminService: AdminService) {}

@Public()
@Post('login')
@ApiOperation({ summary: 'Admin login' })
async login(@Body() user: AdminLoginDto) {
return new ApiResponseDto(
'Login successful',
await this.adminService.login(user),
);
}

@ApiBearerAuth()
@Get('users')
@ApiOperation({ summary: 'Get all users' })
async getUsers() {
return new ApiResponseDto(
'Users retrieved successfully',
await this.adminService.getUsers(),
);
}

@ApiBearerAuth()
@Get('users/:id')
@ApiOperation({ summary: 'Get user by id' })
async getUserById(@Param('id') id: string) {
return new ApiResponseDto(
`User with ID ${id} retrieved`,
await this.adminService.getUser(id),
);
}

@ApiBearerAuth()
@Delete('users/:id')
@ApiOperation({ summary: 'Delete user by id' })
async deleteUser(@Param('id') id: string) {
await this.adminService.deleteUser(id);
return new ApiResponseDto(
`User with ID ${id} deleted successfully`,
null,
);
}


@ApiBearerAuth()
@Post()
@ApiOperation({ summary: 'Create vehicle' })
async createVehicle(@Body() vehicle: CreateVehicleDto) {
return new ApiResponseDto(
'Vehicle created successfully',
await this.adminService.createVehicle(vehicle),
);
}

@ApiBearerAuth()
@Put(':id')
@ApiOperation({ summary: 'Update vehicle data by id' })
async updateVehicle(
@Param('id') id: string,
@Body() vehicle: UpdateVehicleDto,
) {
return new ApiResponseDto(
`Vehicle with ID ${id} updated successfully`,
await this.adminService.updateVehicle(id, vehicle),
);
}

@ApiBearerAuth()
@Delete(':id')
@ApiOperation({ summary: 'Delete vehicle data by id' })
async deleteVehicle(@Param('id') id: string) {
return new ApiResponseDto(
`Vehicle with ID ${id} deleted successfully`,
await this.adminService.deleteVehicle(id),
);
}

@ApiBearerAuth()
@Put('upload/:id')
@ApiOperation({ summary: 'Update vehicle image data by id' })
@ApiConsumes('multipart/form-data')
@ApiBody({
schema: {
type: 'object',
properties: {
files: {
type: 'array',
items: { type: 'string', format: 'binary' },
},
},
},
})
@UseInterceptors(FilesInterceptor('files'))
async uploadImages(
@Param('id') id: string,
@UploadedFiles(
new ParseFilePipeBuilder()
.addFileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })
.addMaxSizeValidator({
maxSize: 1_000_000,
message: 'File size must be less than 1MB',
})
.build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
)
files: Array<Express.Multer.File>,
) {
return new ApiResponseDto(
'Images uploaded successfully',
await this.adminService.uploadImages(id, files),
);
}

@ApiBearerAuth()
@Get('vehicles')
@ApiOperation({ summary: 'Get vehicle statistics' })
async getVehicleStats() {
return new ApiResponseDto(
'Vehicle stats retrieved successfully',
await this.adminService.getVehicleStats(),
);
}

@ApiBearerAuth()
@Get('trips')
@ApiOperation({ summary: 'Get trip analytics' })
async getTripAnalytics() {
return new ApiResponseDto(
'Trip analytics retrieved successfully',
await this.adminService.getTripAnalytics(),
);
}

@ApiBearerAuth()
@Get('maintenance')
@ApiOperation({ summary: 'Get maintenance analytics' })
async getMaintenanceAnalytics() {
return new ApiResponseDto(
'Maintenance analytics retrieved successfully',
await this.adminService.getMaintenanceAnalytics(),
);
}

@ApiBearerAuth()
@Get('costs/:id')
@ApiOperation({ summary: 'Get vehicle cost analytics' })
async getCostAnalytics(@Param('id') vehicleId: string) {
return new ApiResponseDto(
`Cost analytics for vehicle ${vehicleId} retrieved successfully`,
await this.adminService.getCostAnalytics(vehicleId),
);
}

@ApiBearerAuth()
@Get('staff/count')
@ApiOperation({ summary: 'Get total number of staff' })
async getTotalStaffCount() {
return new ApiResponseDto(
'Total number of staff retrieved',
await this.adminService.countAllStaffs(),
);
}


@ApiBearerAuth()
@Get('staff/status/:id')
@ApiOperation({ summary: 'Get staff account activation status' })
async getStaffAccountStatus(@Param('id') id: string) {
const isActive = await this.adminService.getStaffAccountStatus(id);
return new ApiResponseDto(
`Staff activation status for ID ${id} retrieved`,
{ accountActivation: isActive },
);
}





@ApiBearerAuth()
@Patch('staff/activate/:id')
@ApiOperation({ summary: 'Activate staff account' })
async activateStaffAccount(@Param('id') id: string) {
const result = await this.adminService.activateStaffAccount(id);
return new ApiResponseDto(
'Account activation successful',
{ accountActivation: result },
);
}



}
