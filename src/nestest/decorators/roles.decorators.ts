import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// we can attach @SetMetadata() to the router method but using directly is not good.
// instead we could create our own decorators. like above.