import { IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCatDto {

    @IsString()
    @MinLength(2)
    name: string;

    @IsInt()
    @IsPositive()
    age: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    breed_id: number;

}
