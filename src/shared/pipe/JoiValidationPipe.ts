import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from 'joi';
import RestError from "src/shared/@types/RestError";


export class JoiValidationPipe implements PipeTransform {

    constructor(
        private schema: ObjectSchema,
        private type?: 'body' | 'param' | 'query'
    ) {

    }

    transform(value: any, metadata: ArgumentMetadata) {
        if (this.type && metadata.type != this.type) {
            return value
        }
        
        const { error } = this.schema.validate(value);
        if (error) {
            const { message, path, type } = error.details[0]
            throw new RestError({
                errorCode: `VALIDATE_${metadata.metatype.name}_${path}_${type.replace('any.', '').replace(/\./ig, '_')}`.toUpperCase(),
                message
            })
        }
        return value;
    }

}