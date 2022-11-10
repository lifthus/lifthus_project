import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// Guards are executed after all middleware, but before any interceptor or pipe.
@Injectable()
export class AuthGuard implements CanActivate { 
    canActivate(// every guard must implement it. and it has to return boolean.
        context: ExecutionContext, // EC inherits from ArgumentsHost.
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return true; // validateRequest(request); validating logic can differ.
    }
}