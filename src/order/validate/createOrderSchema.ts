import * as Joi from 'joi'
import { OrderStatus, OrderType } from '../order.entity'

export const createOrderSchema = Joi.object({
    orderCode: Joi.string()
        .alphanum()
        .length(8)
        .required(),
    orderType: Joi.string().valid(...Object.keys(OrderType)),
    orderStatus: Joi.string().valid(...Object.keys(OrderStatus)),
    quantity: Joi.number().max(10),
    totalPrice: Joi.number(),
    products: Joi.array().min(1)
})