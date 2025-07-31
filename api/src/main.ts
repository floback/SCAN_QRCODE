import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Servir arquivos estáticos da pasta "uploads"
  app.useStaticAssets(join(__dirname, '..', 'upload'), {
    prefix: '/upload/',
  });

  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
