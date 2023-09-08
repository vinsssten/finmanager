import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './realization/user/user.module';
import { BalanceModule } from './realization/balance/balance.module';
import { AuthModule } from './realization/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SessionModule } from './realization/session/session.module';
import { TokenService } from './realization/token/token.service';
import { TokenModule } from './realization/token/token.module';

@Module({
  imports: [
    // TODO вынести в отдельный файл
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'some_password',
      database: 'finmanager',
      entities: [__dirname + '/entities/*.js'],
    }),
    ConfigModule.forRoot(),
    UserModule,
    BalanceModule,
    AuthModule,
    SessionModule,
    TokenModule,
  ],
  providers: [TokenService],
})
export class AppModule {}
