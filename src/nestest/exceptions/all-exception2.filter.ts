import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { appendFile } from 'fs';


// customized filter but in the use cases when would like to simply extend the built-in default global
// exception filter, and overriding the behavior based on certain factors.

// and to delegate exception processing to base filter, need to extend BaseExceptionFilter
// and call inherited catch()
@Catch()
export class AllExceptionFilter2 extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        super.catch(exception, host)
    }
}
// Method-scoped and Controller-scoped filters extending BaseExceptionFiter should not be
// instantiated with new. just let the framework do it automatically.
// above is just a shell demonstrating.

// Global filters can extend the base filter too. there are 2 ways and following is one of them.
//const { httpAdapter } = app.get(HttpAdapterHost); 
//app.useGlobalFilters(new AllExceptionsFilter(httpAapter));
// to inject the HttpAdapter reference when instantiating the custom gloabal filter.