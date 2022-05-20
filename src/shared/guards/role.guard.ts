import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RoleTypeEnum } from '../interfaces/role.enum';
import { JwtAuthGuard } from './jwt-auth.guard';

const RoleGuard = (role: RoleTypeEnum): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<any>();
      const user = request.user;

      return user?.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
