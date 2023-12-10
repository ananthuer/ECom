import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsValidPassword } from "../password-decorator";

export class ChangePasswordDto {
   

    @IsString()
    @ApiProperty()
    oldPassword: string;

    
    @IsString()
    @ApiProperty()
    @IsValidPassword({message: "password must contain alphabets, numbers, special characters, and be of length less than 16"})
    NewPassword: string;
}