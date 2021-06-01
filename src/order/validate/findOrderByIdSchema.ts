import * as Joi from 'joi'
import { OrderStatus, OrderType } from '../order.entity'

export const findOrderByIdSchema = Joi.object({
    id: Joi.string().regex(/^\d+$/).required()
})