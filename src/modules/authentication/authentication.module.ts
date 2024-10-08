import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
// import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, AdminModule],

  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
