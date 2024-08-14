import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/product.module';
import { SeedModule } from './seed/seed.module';
import { CategoryModule } from './category/category.module';
import { RolesModule } from './roles/role.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI
      })
    }),
    ProductModule,
    SeedModule,
    CategoryModule,
    RolesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
