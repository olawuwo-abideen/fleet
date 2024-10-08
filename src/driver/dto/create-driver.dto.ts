import { IsNotEmpty, IsInt, IsString} from 'class-validator';


export class CreateDriverDto {

  @IsString()
  @IsNotEmpty()
  name: string;

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