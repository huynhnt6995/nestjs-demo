import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product
        ])],
    providers: [ProductService],
    controllers: [
        ProductController
    ],
    exports: [
        ProductService
    ]
})
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        
    }
}
