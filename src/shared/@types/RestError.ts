export default class RestError extends Error{
    errorCode: string;
    message: string;

    constructor(data: Partial<RestError>) {
        super()
        Object.assign(this, data)
    }
}
