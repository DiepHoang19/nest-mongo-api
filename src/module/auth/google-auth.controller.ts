import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

interface GoogleUser {
  displayName: string;
  id: string;
  name: { familyName: string; givenName: string };
  emails: [{ value: string; verified: true }];
  photos: [
    {
      value: string;
    },
  ];
  provider: string;
}

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('/login')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    console.log('chạy vào đây');
    // Được gọi khi người dùng được chuyển hướng tới Google OAuth
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as GoogleUser;
    const token = this.jwtService.sign({ id: user.id, email: user.emails });

    const { displayName, photos, emails } = user;
    const queryParams = new URLSearchParams({
      full_name: displayName,
      avatar: photos?.[0]?.value || '',
      email: emails?.[0]?.value || '',
      token,
    });

    return res.redirect(`http://localhost:3000?${queryParams.toString()}`);
  }
}
