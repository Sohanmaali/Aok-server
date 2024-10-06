import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://aok-ui.onrender.com', // Specify your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Optional, use if you need to send credentials (cookies, authorization headers, etc.)
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(express.json()); // Parse application/json
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

  await app.listen(3005);
  console.log('Server is running on http://localhost:3005');
}
bootstrap();
