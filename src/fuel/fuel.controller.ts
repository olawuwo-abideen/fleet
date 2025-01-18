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
import { FuelService } from './fuel.service';
import { CreateFuelDto, UpdateFuelDto} from './dto/fuel.dto';
import { Fuel } from './schemas/fuel.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('fuel')
@Controller('fuel')
export class FuelController {
constructor(private fuelService: FuelService) {}

@Get()
@ApiOperation({ summary: 'Get all fuel' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
@UseGuards(AuthGuard(), RolesGuard)
async getAllMaintenances(@Req() req): Promise<Fuel[]>{
return this.fuelService.findAll(req.user)
}

@Post()
@ApiOperation({ summary: 'Create fuel' })
@ApiBody({ type: CreateFuelDto, description: 'Fuel Data' })
@ApiResponse({
  status: HttpStatus.CREATED,
  description:
    'Data Successfully created',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
@UseGuards(AuthGuard())
async createFuel(
@Body()
fuel: CreateFuelDto,
@Req() req,
): Promise<Fuel> {
return this.fuelService.create(fuel, req.user);
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
): Promise<Fuel> {
return this.fuelService.findById(id, req.user);
}

@Put(':id')
@ApiOperation({ summary: 'Update fuel data by id' })
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
): Promise<Fuel> {
return this.fuelService.updateById(id, fuel, req.user);
}


}
