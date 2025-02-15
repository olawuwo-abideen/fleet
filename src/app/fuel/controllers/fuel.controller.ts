import {
Body,
Controller,
Delete,
Get,
HttpStatus,
Param,
Post,
Put,
Req,
UseGuards
} from '@nestjs/common';
import { FuelService } from '../services/fuel.service';
import { CreateFuelDto, UpdateFuelDto} from '../dto/fuel.dto';
import { Fuel } from '../schemas/fuel.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { User } from 'src/app/auth/schemas/user.schema';

@ApiBearerAuth()
@ApiTags('Fuel')
@Controller('fuel')
export class FuelController {
constructor(private fuelService: FuelService) {}

@Get()
@ApiOperation({ summary: 'Get all fuel purchased' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
async getAllFuels(
  @CurrentUser() user: User
): Promise<{ message: string; data: Fuel[]; }>{
return this.fuelService.findAll(user)
}

@Post()
@ApiOperation({ summary: 'Create fuel purchased' })
@ApiBody({ type: CreateFuelDto, description: 'Fuel Data' })
@ApiResponse({
  status: HttpStatus.CREATED,
  description:
    'Data Successfully created',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async createFuel(
  @CurrentUser() user: User,
@Body() fuel: CreateFuelDto,
): Promise<{ message: string; data: Fuel; }> {
return this.fuelService.create(user, fuel );
}

@Get(':id')
@ApiOperation({ summary: 'Get fuel purchased by id' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
  'Data Successfully fetched',
})
@Roles(Role.Driver, Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async getFuel(
@Param('id')
id: string,
@Req() req
): Promise<{ message: string; data: Fuel; }> {
return this.fuelService.findById(id, req.user);
}

@Put(':id')
@ApiOperation({ summary: 'Update fuel purchased by id' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data updated successfully',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async updateFuel(
@Param('id')
id: string,
@Body()
fuel: UpdateFuelDto,
@Req() req
): Promise<{ message: string; data: Fuel; }> {
return this.fuelService.updateById(id, fuel, req.user);
}


}
