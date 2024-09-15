import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { BorrowingModule } from './modules/borrowing/borrowing.module';
import { AuthModule } from './modules/authentication/auth/auth.module';
import { AdminModule } from './modules/authentication/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/aok'),
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
    }),

    ItemsModule,
    BorrowingModule,
    AuthModule,
    // AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
