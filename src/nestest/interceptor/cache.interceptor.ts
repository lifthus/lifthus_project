// returning its response from a cache for improving response time
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const isCached = true;
        if ( isCached ) {
            return of([]); // we create a new stream here created by the RxJS of() operator.
        }                    // therefore the route handler won't be called at all.
        return next.handle();
    }
}