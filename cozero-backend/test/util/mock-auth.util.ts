import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MockAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    context.switchToHttp().getRequest().user = {
      email: 'test@cozero.dev',
      password: '2ubVoXMKEveV866kPqJm',
    };
    return true;
  }
}
