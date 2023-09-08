import {
  Controller,
  Inject,
  Post,
  Query,
  Response,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { GetUser } from '../../lib/decorators/user';
import { UserDto } from '../../models/user.dto';
import { plainToClass } from 'class-transformer';

@ApiTags('Auth controller')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post('login')
  async signIn(
    @Query('login') login: string,
    @Query('password') password: string,
    @Response() response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      login,
      password,
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expiresIn: new Date(new Date().getTime() + 60 * 60 * 1000),
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

  // TODO логика рефреша
  @Post('refresh')
  async refresh(@Request() request: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(request.cookies);
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('change-pass')
  // changePassword(@Query('id') id: number, @Query('password') password: string) {
  //   return this.authService.changePassword(id, password);
  // }
}
