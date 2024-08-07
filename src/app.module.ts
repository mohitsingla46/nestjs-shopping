import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { SeedModule } from './seed/seed.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI
      })
    }),
    BookModule,
    SeedModule,
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
