import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Product } from "./schemas/product.schema";
import { ProductDao } from './product.dao';
import { ResponseService } from "../common/services/response.service";
import { ResponseDto } from "src/common/dto/response.dto";

@Injectable({})
export class ProductService {
    constructor(
        private readonly productDao: ProductDao,
        private readonly responseService: ResponseService
    ) { }

    async addproduct(product: Product): Promise<ResponseDto<any>> {
        try {
            const productAdded = await this.productDao.create(product);
            return this.responseService.success(productAdded);
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getproducts(): Promise<ResponseDto<any>> {
        try {
            const products = await this.productDao.find();
            return this.responseService.success(products);
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getproductbyid(id: string): Promise<ResponseDto<any>> {
        try {
            const product = await this.productDao.findById(id);
            if (product) {
                return this.responseService.success(product);
            }

            return this.responseService.error('Product not found', HttpStatus.BAD_REQUEST);
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteproductbyid(id: string): Promise<ResponseDto<any>> {
        try {
            const product = await this.productDao.findByIdAndDelete(id);
            return this.responseService.success(product);
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}