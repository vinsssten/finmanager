import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Finmanager: Main Interface')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'Auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = 5000;

  await app.listen(port);
  console.log(`Api started on port ${port}.`, `localhost:${port}`);
}
bootstrap();
