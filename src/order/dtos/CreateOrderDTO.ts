import { OrderStatus, OrderType } from "../order.entity";

export interface CreateOrderDTO {
    
    orderCode: string;

    orderType?: OrderType;

    products: string[];

    orderStatus: OrderStatus;

    quantity: number;

    totalPrice: number;
}