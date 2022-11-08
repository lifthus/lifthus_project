// exception filter for custom response logic.
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ForbiddenException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch(HttpException)// binds the required metadata to the exception filter, telling Nest the E types.
export class HttpExceptionFilter implements ExceptionFilter {
    // all exception filters should impolement the generic ExceptionFilter<T> interface.
    // and it requires you to provide the catch(exception: T, host: ArgumentHost ). (T the type of the exception)
    catch(exception: HttpException, host: ArgumentsHost) {
        // ArgumentsHost is a powerful utility objecct, but we use it to obtain ref to req and res here.
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
          .status(status)
          .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
          });
    }
}

// and it can be appliled lile :
// @Post()
// @UseFilter(HttpExcetionFilter) or (new HttpExceptionFilter())
// async create(@Body() createCatDto: CreateCatDto) {
// throw new ForbiddenException();

// but prefer using classes instead of instances becuase it reduces memory usage
// since Nest can easily reuse instances of the same class across entire module.

// and the filter can be scoped at different levels: controller-scoped, global-scoped
// @UseFilters(new HttpExceptionFilter())
// export class CatsController{}

// for global, in bootstrap(), app.useGlobalFilters(new Http~());
// and since it is done outside the context of any module, can't inject dependencies.
// in order to solve this issue, can register global-scoped filter directly from anu module like:
// @module ~~
//     provide: APP_FILTER,
//     useClass: HttpExceptionFilter,
// ~~ export class AppModule {}


/* To catch everything */
@Catch() // parameter empty to catch everything
export class AllExceptionFilter implements ExceptionFilter {
    constructor (private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations 'httpAdapter' might not be available in the constructor method,
        // thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus = 
          exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
