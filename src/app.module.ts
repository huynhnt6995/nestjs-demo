import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    SharedModule,
    ProductModule, 
    OrderModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
