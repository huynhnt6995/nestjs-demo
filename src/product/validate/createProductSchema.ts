import * as Joi from 'joi'

export const createProductSchema = Joi.object({
    productCode: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    productName: Joi.string()
        .min(3)
        .max(255),

    price: Joi.number()
        .integer()
        .min(0)
})