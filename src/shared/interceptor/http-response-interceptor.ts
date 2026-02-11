import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/api-response';
import { Response } from 'express';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req = context.switchToHttp().getRequest();

    // ✅ EXCLUDE Prometheus metrics endpoint
    if (req.path === '/metrics') {
      return next.handle(); // return raw response (plain text)
    }

    return next.handle().pipe(
      map((data: ApiResponseDto<any> | any) => {

        // throw exception if response is an error
        if (
          data instanceof Error ||
          data?.data instanceof Error
        ) {
          if (data instanceof ApiResponseDto) {
            throw data.data;
          }
          throw data;
        }

        const res = context.switchToHttp().getResponse<Response>();

        if (
          res.statusCode === 201 &&
          req.method === 'POST'
        ) {
          res.status(200);
        }

        const response: Record<string, any> = {
          status: true,
          code: res.statusCode,
          message: 'Successful',
          data,
        };

        if (data instanceof ApiResponseDto) {
          response.message = data.message;
          response.data = data.data;
        }

        return response;
      }),
      catchError((error) => throwError(() => error)),
    );
  }
}
