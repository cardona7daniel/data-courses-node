import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const PORT = +configService.get<number>('port');
  await app.listen(PORT);
}
bootstrap();
