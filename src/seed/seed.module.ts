import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../auth/schemas/role.schema';
import { SeedService } from './seed.service';
import { Category, CategorySchema } from '../category/schemas/category.schema';
import { Book, BookSchema } from '../book/schemas/books.schema';
import { BookService } from '../book/book.service';
import { BookDao } from '../book/book.dao';
import { ResponseService } from '../common/services/response.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { 
                name: Role.name, schema: RoleSchema 
            },
            {
                name: Category.name, schema: CategorySchema
            },
            {
                name: Book.name, schema: BookSchema
            }
        ]),
    ],
    providers: [SeedService, BookService, BookDao, ResponseService],
})
export class SeedModule { }