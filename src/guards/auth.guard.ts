import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { getInstanceName, getMethodName } from '../utils/strings';

const NODE_ENV = 'dev'; // TODO: need refactor

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(`${NODE_ENV}-${getInstanceName(this)}`);

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let headerAuth = '';
    try {
      const request = context.switchToHttp().getRequest();
      headerAuth = request.headers.authorization;
      // TODO: Add some logic code here
      return true;
    } catch (e) {
      this.logger.error(`${getMethodName()}==exception==`, e?.message);
      this.logger.error(`${getMethodName()}==headerAuth==`, headerAuth);
      return Promise.reject(UnauthorizedException);
    }
  }
}
