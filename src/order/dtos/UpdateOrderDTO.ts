import { OrderStatus, OrderType } from "../order.entity";

export interface UpdateOrderDTO {
    
    orderCode: string;

    orderType?: OrderType;

    products: string[];

    orderStatus: OrderStatus;

    quantity: number;

    totalPrice: number;
}