  import { ApiProperty } from '@nestjs/swagger';
  import { IsEmail, IsNotEmpty } from 'class-validator';

  export class ForgotPasswordDto {

    @ApiProperty({
      required: true,
      description: 'Email address of the user',
      example: 'abideenolawuwo2000@gmail.com',
      })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  }
