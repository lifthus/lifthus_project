// instead of using const user = req.user; everytime.
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getResponse();
        return request.user
    },
);
// and like:
// @Get()
// async findOne(@User() user: UserEntity) {
// console.log(user);
// }

export const User2 = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getResponse();
        const user = request.user
        return data ? user?.[data] : user;
    },
);
// and like :
// @Get()
// async findOne(@User2('firstName') firstName: string) {
// console.log('Hello ${firstName})
// }