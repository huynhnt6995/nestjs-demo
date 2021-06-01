import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import CreateProductDTO from "./dto/CreateProductDTO";
import { Product } from "./product.entity";

export class ProductService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {

    }

    async findAll() {
        return this.productRepository.find()
    }

    async create(product: Product) {
        await this.productRepository.save(product)
        return product
    }

    async findByCode(productCode: string) {
        return await this.productRepository.findOne({ productCode })
    }

    async findById(id: number) {
        return this.productRepository.findOne(id)
    }

    async checkProductCodes(productCodes: string[]) {
        const numOfProduct = await this.productRepository.count({where: {productCode: In(productCodes)}})
        if(numOfProduct != productCodes.length) return false
        return true
    }

    async remove(product: Product) {
        return this.productRepository.remove(product)
    }

}