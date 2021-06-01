import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'product' })
export class Product {
    constructor(data?: Partial<Product>) {
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true, name: 'product_code' })
    productCode: string;

    @Column({ name: 'product_name' })
    productName?: string;

    @Column({ type: 'double precision', name: 'price' })
    price: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}