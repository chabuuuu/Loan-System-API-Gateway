import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class GetAllDto{
    @IsNotEmpty()
    @IsString()
    status!: number;
    @IsNotEmpty()
    @IsString()
    message!: string;
    @IsNotEmpty()
    @IsArray()
    data : any;
}