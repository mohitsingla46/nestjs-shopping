import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../auth/schemas/role.schema';
import { SeedService } from './seed.service';
import { Category, CategorySchema } from '../category/schemas/category.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';
import { ProductService } from '../products/product.service';
import { ProductDao } from '../products/product.dao';
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
                name: Product.name, schema: ProductSchema
            }
        ]),
    ],
    providers: [SeedService, ProductService, ProductDao, ResponseService],
})
export class SeedModule { }