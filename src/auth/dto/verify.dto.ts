import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class VerifyDto {

    @IsString()
    @ApiProperty()
    username: string;
    
    @IsString()
    @ApiProperty()
    otp: string;

}