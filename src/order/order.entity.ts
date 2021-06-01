import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum OrderType {
    furniture = 'furniture',
    kitchen = 'kitchen'
}

export enum OrderStatus {
    ending = 'ending',
    success = 'success',
    fail = 'fail'
}

@Entity()
export class Order {
    constructor(data?: Partial<Order>) {
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true, name: 'order_code' })
    orderCode: string;

    @Column({ name: 'order_type' })
    orderType?: OrderType;

    @Column({ type: 'simple-array', name: 'products' })
    products: string[];

    @Column({ name: 'order_status' })
    orderStatus: OrderStatus;

    @Column({ type: 'int', name: 'quantity' })
    quantity: number;

    @Column({ type: 'double precision', name: 'total_price' })
    totalPrice: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}