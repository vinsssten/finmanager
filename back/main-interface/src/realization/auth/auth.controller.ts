import {
  Controller,
  Inject,
  Post,
  Response,
  Request,
  UseGuards,
  ForbiddenException, Body, Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { GetUser } from '../../lib/decorators/user';
import { UserDto } from '../../models/user.dto';
import { plainToClass } from 'class-transformer';

const REFRESH_MAX_AGE = 24 * 60 * 60 * 1000;

@ApiTags('Auth controller')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body() loginDto: { login: string; password: string },
    @Response() response,
  ) {
    Logger.log(`Try to login ${loginDto.login}`);
    const { accessToken, refreshToken } = await this.authService.signIn(
      loginDto.login,
      loginDto.password,
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_MAX_AGE,
    });

    response.send({ accessToken });
  }

  @ApiResponse({
    status: 201,
    description: 'Access token is valid',
    type: UserDto,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Auth')
  @Post('check')
  async check(@GetUser() user: any): Promise<UserDto> {
    return plainToClass(UserDto, await this.authService.getUser(user.sub));
  }

  @Post('refresh')
  async refresh(@Request() request: Request, @Response() response) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const refreshTokenFromCookie = request.cookies.refreshToken;

    if (!refreshTokenFromCookie) {
      throw new ForbiddenException();
    }

    const { accessToken, refreshToken } = await this.authService.refresh(
      refreshTokenFromCookie,
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_MAX_AGE,
    });

    response.send({ accessToken });
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('change-pass')
  // changePassword(@Query('id') id: number, @Query('password') password: string) {
  //   return this.authService.changePassword(id, password);
  // }
}
