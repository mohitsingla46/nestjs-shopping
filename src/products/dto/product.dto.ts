import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { Category } from "../../category/schemas/category.schema";
import { Types } from "mongoose";

export class ProductDto{
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    inStock: boolean;

    @IsNotEmpty()
    @ApiProperty()
    category: string | Types.ObjectId | Category;
}