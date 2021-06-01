import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import RestError from 'src/shared/@types/RestError';
import { JoiValidationPipe } from 'src/shared/pipe/JoiValidationPipe';
import CreateProductDTO from './dto/CreateProductDTO';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { createProductSchema } from './validate/createProductSchema';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Post()
    @UsePipes(new JoiValidationPipe(createProductSchema))
    async create(@Body() data: CreateProductDTO) {
        const existedProduct = await this.productService.findByCode(data.productCode)
        if (existedProduct) throw new RestError({ errorCode: 'PRODUCT_CODE_EXISTED' })

        const product = new Product(data)
        return await this.productService.create(product)
    }

    @Get()
    async find() {
        return await this.productService.findAll()
    }
}
