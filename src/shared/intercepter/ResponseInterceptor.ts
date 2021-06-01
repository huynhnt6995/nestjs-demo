import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from '../@types/ResponseData';


@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data) => {
                    context.switchToHttp().getResponse().status(200);
                    if (!data) return new ResponseData(undefined, { code: 'NOT_FOUND' })

                    if (data.limit || data.offset || data.items || data.totalPage) {
                        return data
                    } else if (data instanceof Array) {
                        return new ResponseData({
                            items: data
                        })
                    }
                    return new ResponseData({
                        item: data
                    })
                })
            );
    }
}