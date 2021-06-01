import { OrderStatus, OrderType } from "../order.entity";

export interface FindOrderDTO {
    orderId?: string
    orderCode?: string
    orderType?: OrderType
    orderStatus: OrderStatus
    limit: string
    offset: string
}