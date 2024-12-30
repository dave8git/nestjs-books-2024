import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // all middlewares should be always before app.listen
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.enableShutdownHooks();
  const configService = app.get(ConfigService);
  await app.listen(configService.get('port'));
  //await app.listen(3000);
}
bootstrap();
