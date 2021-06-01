import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, Delete } from '@nestjs/common';
import RestError from 'src/shared/@types/RestError';
import { JoiValidationPipe } from 'src/shared/pipe/JoiValidationPipe';
import { CreateOrderDTO } from './dtos/CreateOrderDTO';
import { FindOrderByIdDTO } from './dtos/FindOrderByIdDTO';
import { FindOrderDTO } from './dtos/FindOrderDTO';
import { UpdateOrderParamDTO } from './dtos/UpdateOrderParamDTO';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { createOrderSchema } from './validate/createOrderSchema';
import { findOrderByIdSchema } from './validate/findOrderByIdSchema';
import { findOrderSchema } from './validate/findOrderSchema';
import { UpdateOrderDTO } from './dtos/UpdateOrderDTO'
import { updateOrderSchema } from './validate/updateOrderSchema';
import { updateOrderParamSchema } from './validate/updateOrderParamSchema';
import { ProductService } from 'src/product/product.service';
import { StatisticsOrderByDayDTO } from './dtos/StatisticsOrderByDayDTO';
import { StatisticsService } from './statistics.service';
import { getVnDateFormat } from 'src/shared/utils/datetimeUtil';
import { request } from 'express';


@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly productService: ProductService,
        private readonly statisticsService: StatisticsService
    ) { }

    @Post()
    @UsePipes(new JoiValidationPipe(createOrderSchema))
    async create(@Body() data: CreateOrderDTO) {
        const existedOrder = await this.orderService.findByCode(data.orderCode)
        if (existedOrder) throw new RestError({
            errorCode: 'ORDER_CODE_EXISTED',
            message: 'Order code existed'
        })

        const existedProductCode = await this.productService.checkProductCodes(data.products)
        if (!existedProductCode) throw new RestError({ errorCode: 'PRODUCT_CODE_NOT_FOUND' })

        let order = new Order(data)
        order = await this.orderService.createOrUpdate(order)
        return order
    }

    @Get('/report')
    async statistics(@Query() query: StatisticsOrderByDayDTO) {
        let date: string | undefined

        const { startDate, endDate } = query

        const data = await this.statisticsService.statistics(startDate, endDate)
        if (!data) throw new RestError({
            errorCode: 'NOT_FOUND_STATISTICS_DATA'
        })
        return data
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe(findOrderByIdSchema))
    async findById(@Param() params: FindOrderByIdDTO) {
        const order = await this.orderService.findById(parseInt(params.id))
        if (!order) throw new RestError({
            errorCode: 'NOT_FOUND_ORDER_BY_ID',
            message: "Not found order id " + params.id
        })
        return order
    }

    @Get()
    @UsePipes(new JoiValidationPipe(findOrderSchema))
    async find(@Query() query: FindOrderDTO) {
        return await this.orderService.findAll(query)
    }

    @Put(':id')
    @UsePipes(new JoiValidationPipe(updateOrderSchema, 'body'))
    @UsePipes(new JoiValidationPipe(updateOrderParamSchema, 'param'))
    async update(
        @Param() params: UpdateOrderParamDTO,
        @Body() data: UpdateOrderDTO
    ) {
        let order = await this.orderService.findById(parseInt(params.id))
        if (!order) throw new RestError({ errorCode: 'UPDATE_NOT_FOUND_ORDER_BY_ID' })

        const existedProductCode = await this.productService.checkProductCodes(data.products)
        if (!existedProductCode) throw new RestError({ errorCode: 'PRODUCT_CODE_NOT_FOUND' })

        Object.assign(order, data)
        order = await this.orderService.createOrUpdate(order)
        return order
    }

    @Delete(':id')
    async remove(@Param() params: UpdateOrderParamDTO) {
        let order = await this.orderService.findById(parseInt(params.id))
        if (!order) throw new RestError({ errorCode: 'UPDATE_NOT_FOUND_ORDER_BY_ID' })
        order = await this.orderService.remove(order)
        return order
    }
}
