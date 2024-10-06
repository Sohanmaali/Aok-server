import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
    origin: 'https://aok-ui.onrender.com', // Ensure this matches your frontend URL exactly
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(express.json()); // Parse application/json
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

  await app.listen(3005);
  console.log('Server is running on http://localhost:3005');
}
bootstrap();
