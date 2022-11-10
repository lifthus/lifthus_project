import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean /*| Promise<boolean> | Observable<boolean>*/ {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if(!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return true; // matchRoles(roles, user.roles);
    } // if return false, 403 forbidden. if want custom response, use custom exception.
}

// @Controller('sbd')