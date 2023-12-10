import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString } from "class-validator";

export class CreateCheckoutDto {


    
    @IsArray()
    @Type(() => Number)
    @ApiProperty({isArray: true, type: Number})
    cart_products: number[];

}
