import * as Joi from "joi";

export const updateOrderParamSchema = Joi.object({
    id: Joi.string().regex(/^\d+$/).required()
})