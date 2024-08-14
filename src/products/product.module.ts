import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { User, UserSchema } from '../auth/schemas/users.schema';
import { ProductDao } from './product.dao';
import { ResponseService } from '../common/services/response.service';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Product.name, schema: ProductSchema
        },
        {
            name: User.name, schema: UserSchema
        }
    ])],
    controllers: [ProductController],
    providers: [ProductDao, ProductService, ResponseService]
})
export class ProductModule { }
