import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
// import { BorrowingModule } from './modules/borrowing/borrowing.module';
import { AuthModule } from './modules/authentication/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './cms/files/file.module';
import { AokModule } from './modules/aok/aok.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/aok', {
      serverSelectionTimeoutMS: 20000, // Increase timeout period (20 seconds)
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ItemsModule,
    // BorrowingModule,
    AuthModule,
    FileModule,
    AokModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
