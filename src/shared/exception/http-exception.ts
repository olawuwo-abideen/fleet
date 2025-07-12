import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { isString } from 'class-validator';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  private readonly logger = new Logger('HttpException');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = (exceptionResponse as any).message;
    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception);

      message = 'Internal Server Error';
    }

    const errorResponse: Record<string, unknown> = {
      success: false,
      code: statusCode,
      message,
    };
    if (statusCode == HttpStatus.BAD_REQUEST && !isString(message)) {
      errorResponse.errors = message;
      errorResponse.message = exceptionResponse.error;
    }

    response.status(statusCode).json(errorResponse);
  }
}
