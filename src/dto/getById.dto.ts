import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class GetByIdDto {
    @IsNotEmpty()
    @IsString()
    status!: number;
    
    @IsNotEmpty()
    @IsString()
    message!: string;

    @IsNotEmpty()
    @IsObject()
    data : any;
}