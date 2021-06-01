import * as Joi from 'joi'
import { OrderStatus, OrderType } from '../order.entity'

export const findOrderSchema = Joi.object({
    orderId: Joi.string().regex(/^\d+$/),
    orderCode: Joi.string().length(8),
    orderType: Joi.string().valid(...Object.keys(OrderType)),
    orderStatus: Joi.string().valid(...Object.keys(OrderStatus)),
    limit: Joi.number().min(1).integer(),
    offset: Joi.number().min(0).integer()
})