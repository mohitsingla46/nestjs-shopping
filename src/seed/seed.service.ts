import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from '../auth/schemas/role.schema';
import { Category } from '../category/schemas/category.schema';
import { BookService } from '../book/book.service';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);
    private categories: any[];
    private roles: any[];

    constructor(
        @InjectModel(Role.name) private roleModel: Model<Role>,
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        private bookService: BookService
    ) {
        const cateforiesFile = join(process.cwd(), 'src/seed/data', 'categories.json');
        this.categories = JSON.parse(readFileSync(cateforiesFile, 'utf-8'));
        const rolesFile = join(process.cwd(), 'src/seed/data', 'roles.json');
        this.roles = JSON.parse(readFileSync(rolesFile, 'utf-8'));
     }

    async seed() {

        for (const role of this.roles) {
            const existingRole = await this.roleModel.findOne({ name: role.name });
            if (!existingRole) {
                await this.roleModel.create(role);
                this.logger.log(`Inserted role: ${role.name}`);
            } else {
                this.logger.log(`Role ${role.name} already exists`);
            }
        }

        for (const category of this.categories) {
            let categoryAdded = null;
            const existingCategory = await this.categoryModel.findOne({ name: category.name });
            if (!existingCategory) {
                categoryAdded = await this.categoryModel.create(category);
                this.logger.log(`Inserted category: ${category.name}`);
            } else {
                categoryAdded = await this.categoryModel.findOne({name: category.name});
                this.logger.log(`Category ${category.name} already exists`);
            }

            if (categoryAdded) {
                for (const bookData of category.books) {
                    const book = {
                        ...bookData, 
                        category: new Types.ObjectId(categoryAdded._id).toString()
                    };
                    await this.bookService.addbook(book);
                    this.logger.log(`Inserted book: ${bookData.title}`);
                }
            }
        }
    }
}
