import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller'
import { SharedModule } from 'src/shared/shared.module';
import { ProductModule } from 'src/product/product.module';
import { StatisticsService } from './statistics.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        SharedModule,
        ProductModule
    ],
    providers: [
        OrderService,
        StatisticsService
    ],
    controllers: [
        OrderController
    ]
})
export class OrderModule { }
