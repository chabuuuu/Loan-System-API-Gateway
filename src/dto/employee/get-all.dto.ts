import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class GetAllEmployeeDto {
    @IsNotEmpty()
    @IsArray()
    data: any;

    @IsNotEmpty()
    @IsString()
    page!: string;

    @IsNotEmpty()
    @IsString()
    perPage!: string;

    @IsNotEmpty()
    @IsString()
    totalCount!: string;

    @IsNotEmpty()
    @IsString()
    from!: string;

}