import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    console.log('Interceptor', context);

    return handler.handle().pipe(
      map((data: any) => {
        console.log('Next handler', data);
      }),
    );
  }
}
