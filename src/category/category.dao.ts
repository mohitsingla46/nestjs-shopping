import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./schemas/category.schema";
import { Model } from "mongoose";

@Injectable()

export class CategoryDao {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<Category>
    ) { }

    async find() {
        return await this.categoryModel.find();
    }
}