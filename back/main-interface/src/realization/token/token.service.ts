import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private readonly refreshSecret: string;
  private readonly accessSecret: string;

  constructor(private jwtService: JwtService) {
    this.accessSecret = process.env.JWT_ACCESS;
    this.refreshSecret = process.env.JWT_REFRESH;
  }
  generateTokens(payload: Record<string, any>) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: this.accessSecret,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '90d',
      secret: this.refreshSecret,
    });

    return { accessToken, refreshToken };
  }

  decode(token: string) {
    return this.jwtService.decode(token);
  }

  verifyAccess(token: string) {
    return this.jwtService.verify(token, {
      secret: this.accessSecret,
    });
  }

  verifyRefresh(token: string) {
    return this.jwtService.verify(token, {
      secret: this.refreshSecret,
    });
  }
}
