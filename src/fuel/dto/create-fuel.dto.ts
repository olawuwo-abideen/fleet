import { IsNotEmpty, IsInt,isDate, IsString, IsEmpty} from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';


export class CreateFuelDto {

  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsInt()
  @IsNotEmpty()
  pricePerLitre: number;

  @IsInt()
  @IsNotEmpty()
  cost: number;


  @IsEmpty({ message: 'You cannot pass user id' })
  user: User;

}
