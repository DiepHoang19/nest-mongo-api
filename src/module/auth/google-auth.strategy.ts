import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { GoogleAuthService } from './google-auth.service';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private googleAuthService: GoogleAuthService) {
    super({
      clientID:
        '306061568910-dfcrq06acdgfhskphjsm506vd5c7dee9.apps.googleusercontent.com', // Thay bằng client ID của bạn
      clientSecret: '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', // Thay bằng client secret của bạn
      callbackURL: 'http://localhost:3000/auth/google/callback', // URL callback của bạn
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    console.log(
      '🚀 ~ GoogleAuthStrategy ~ classGoogleAuthStrategyextendsPassportStrategy ~ accessToken:',
      accessToken,
    );
    console.log(
      '🚀 ~ GoogleAuthStrategy ~ classGoogleAuthStrategyextendsPassportStrategy ~ refreshToken:',
      refreshToken,
    );
    // Kiểm tra và xử lý người dùng từ profile
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.googleAuthService.validateUser(profile);
  }
}
