import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @ApiProperty()
    readonly price: number;

    @IsString()
    @ApiProperty()
    readonly description: string;

    @IsString()
    @ApiProperty()
    readonly quantity: number;

}
