import { IsNotEmpty, IsInt, IsString} from 'class-validator';


export class CreateDriverDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @IsInt()
  @IsNotEmpty()
  phoneNumber: number;

  @IsString()
  @IsNotEmpty()
  address: string;

}