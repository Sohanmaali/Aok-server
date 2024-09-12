import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: 'http://localhost:3000', // Replace with the origin of your frontend application
  //   methods: 'GET,POST,PUT,DELETE,OPTIONS',
  //   allowedHeaders: 'Content-Type, Authorization',
  // });

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3005);
  console.log('i am running');
}
bootstrap();