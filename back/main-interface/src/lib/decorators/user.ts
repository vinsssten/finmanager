import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new ForbiddenException('Can`t identify user');
    }

    return request.user;
  },
);
