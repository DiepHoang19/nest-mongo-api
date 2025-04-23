import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleAuthStrategy } from './google-auth.strategy';

@Module({
  imports: [PassportModule],
  providers: [GoogleAuthService, GoogleAuthStrategy],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
