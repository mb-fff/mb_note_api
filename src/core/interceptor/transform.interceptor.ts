/**
 * 拦截器（interceptor）
 * nest g interceptor core/interceptor/transform
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        return {
          data,
          code: 0,
          msg: 'OK'
        }
      })
    )
  }
}