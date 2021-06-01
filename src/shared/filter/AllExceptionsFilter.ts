import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import RestError from 'src/shared/@types/RestError';
import { ResponseData } from 'src/shared/@types/ResponseData';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: RestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const responseData = new ResponseData(undefined, {
            code: exception ? (exception.errorCode || 'UNKNOW_ERROR') : 'UNKNOW_ERROR',
            message: exception.message,
            stack: exception.stack
        })

        response
            .status(200)
            .json(responseData)
    }
}