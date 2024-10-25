import { IsNotEmpty, IsInt,isDate, IsString, IsEmpty} from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuelDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  pricePerLitre: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cost: number;


  @IsEmpty({ message: 'You cannot pass user id' })
  user: User;

}
