import {
Controller,
Delete,
Get,
HttpStatus,
Param,
UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from   '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport'
import { AdminService } from '../services/admin.service';
import { User } from '../../auth/schemas/user.schema';
import { Roles } from '../../../shared/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

@Get('drivers')
@ApiOperation({ summary: 'Get all drivers' })
@ApiResponse({
status: HttpStatus.OK,
description:
'Data fetched successfully.',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async getAllDriver(): Promise<{ message: string; drivers: User[]; }>{
return this.adminService.getAllDrivers()
}

@Get('driver/:id')
@ApiOperation({ summary: 'Get driver by id' })
@ApiResponse({
status: HttpStatus.OK,
description:
'Data fetched successfully.',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async getDriver(
@Param('id')
id: string,
): Promise<{ message: string; user: User; }> {
return this.adminService.findById(id);
}


@Delete('driver/:id')
@ApiOperation({ summary: 'Delete driver by id' })
@ApiResponse({
status: HttpStatus.OK,
description:
'Data deleted successfully.',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async deleteDriver(
@Param('id')
id: string,
): Promise<{ message: string }> {
return this.adminService.deleteById(id);
}
}
