import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SessionService } from '../session/session.service';
import { TokenService } from '../token/token.service';
import { User } from '../../entities/user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private tokenService: TokenService,
  ) {}

  private async auth(user: User) {
    const payload = { sub: user.id, name: user.name };
    const { accessToken, refreshToken } =
      this.tokenService.generateTokens(payload);

    await this.sessionService.createSession(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(login: string, password: string) {
    const user = await this.userService.findOneByLogin(login);

    if (!user) {
      throw new ForbiddenException('Incorrect login or password');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('Incorrect login or password');
    }

    return this.auth(user);
  }

  async getUser(userId: number) {
    return this.userService.findOne(userId);
  }

  async refresh(refreshToken: string) {
    const { sub } = this.tokenService.decode(refreshToken) as { sub: number };
    const sessionList = await this.sessionService.getList(sub);

    for (const session of sessionList) {
      if (!this.tokenService.verifyRefresh(session.token)) {
        continue;
      }

      this.sessionService.delete(session.id);
      return this.auth(await this.userService.findOne(session.userId));
    }

    throw new UnauthorizedException();
  }

  async changePassword(id: number, password: string) {
    const salt = await bcrypt.genSalt(8);

    const hash = (await bcrypt.hash(password, salt)) as string;

    await this.userService.changePassword(id, hash);

    return true;
  }
}
