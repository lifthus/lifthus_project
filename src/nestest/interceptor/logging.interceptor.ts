import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    // NestInterceptor<T, R> is a interface in which T indicates type of Observable<T> and R the type 
    // of the value wrapped by Observable<R>
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');

        const now = Date.now();
        return next
        .handle()
        .pipe(
            tap(()=> console.log(`After...${Date.now()- now}`)),
        );
    }
}
// and since handle() returns an RxJS Observable, there's wide choice of operators we can use to manipulate
// the stream. tap() invokes anonymous logging function. not interfering with the response cycle.

// Binding it to the sbdController