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

interface TokenPayload {
  sub: number;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private tokenService: TokenService,
  ) {}

  private async auth(user: User) {
    const payload: TokenPayload = { sub: user.id, name: user.name };
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
    const payload = this.tokenService.verifyRefresh(
      refreshToken,
    ) as TokenPayload;

    const sessionList = await this.sessionService.getList(payload.sub);
    const session = sessionList.find((i) => i.token === refreshToken);

    if (!session) {
      throw new UnauthorizedException();
    }

    const tokens = this.tokenService.generateTokens({
      sub: payload.sub,
      name: payload.name,
    });

    await this.sessionService.updateToken(session.id, tokens.refreshToken);

    return tokens;
  }

  async changePassword(id: number, password: string) {
    const salt = await bcrypt.genSalt(8);

    const hash = (await bcrypt.hash(password, salt)) as string;

    await this.userService.changePassword(id, hash);

    return true;
  }
}
