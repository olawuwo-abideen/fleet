import { IsNotEmpty, IsInt,isDate, IsString, IsEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuelDto {

@ApiProperty({
required: true,
description: 'The vehicle id',
example: 'vsveegu363732bsduhdjd',
})
@IsString()
@IsNotEmpty()
vehicleId: string;

@ApiProperty({
required: true,
description: 'The date of purchase',
example: '12/5/2025',
})
@IsString()
@IsNotEmpty()
date: Date;

@ApiProperty({
required: true,
description: 'The fuel litres in number',
example: '2',
})
@IsInt()
@IsNotEmpty()
litres: number;

@ApiProperty({
required: true,
description: 'The fuwl price per litres',
example: '1000',
})
@IsInt()
@IsNotEmpty()
pricePerLitre: number;

@ApiProperty({
required: true,
description: 'The fuel total cost',
example: '20000',
})
@IsInt()
@IsNotEmpty()
cost: number;

}




export class UpdateFuelDto {

    @ApiProperty({
        required: true,
        description: 'The vehicle id',
        example: 'vsveegu363732bsduhdjd',
        })
        @IsString()
        @IsNotEmpty()
        vehicleId: string;
        
        @ApiProperty({
        required: true,
        description: 'The date of purchase',
        example: '12/5/2025',
        })
        @IsString()
        @IsNotEmpty()
        date: Date;
        
        @ApiProperty({
        required: true,
        description: 'The fuel litres in number',
        example: '2',
        })
        @IsInt()
        @IsNotEmpty()
        litres: number;
        
        @ApiProperty({
        required: true,
        description: 'The fuwl price per litres',
        example: '1000',
        })
        @IsInt()
        @IsNotEmpty()
        pricePerLitre: number;
        
        @ApiProperty({
        required: true,
        description: 'The fuel total cost',
        example: '20000',
        })
        @IsInt()
        @IsNotEmpty()
        cost: number;
        

}
