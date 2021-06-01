import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FindOrderDTO } from "./dtos/FindOrderDTO";
import { Order } from "./order.entity";

export class OrderService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {

    }

    async findAll(query: FindOrderDTO) {
        const whereParams = {}
        if (query.orderType) whereParams['orderType'] = query.orderType
        if (query.orderStatus) whereParams['orderStatus'] = query.orderStatus
        if (query.orderCode) whereParams['orderCode'] = query.orderCode
        if (query.orderId) whereParams['id'] = query.orderId

        let skip = 0
        if (query.offset) skip = parseInt(query.offset)

        let take: number | undefined
        if (query.limit) take = parseInt(query.limit)

        if (take) {
            const [items, total] = await this.orderRepository.findAndCount({ where: whereParams, skip, take })
            return { total, items, limit: take, offset: skip }
        } else {
            const items = await this.orderRepository.find({ where: whereParams, skip })
            return { items, offset: skip }
        }
    }

    async createOrUpdate(order: Order) {
        await this.orderRepository.save(order)
        return order
    }

    async findByCode(orderCode: string) {
        return await this.orderRepository.findOne({ orderCode })
    }

    async findById(id: number) {
        return this.orderRepository.findOne(id)
    }

    async remove(order: Order) {
        return this.orderRepository.remove(order)
    }
}