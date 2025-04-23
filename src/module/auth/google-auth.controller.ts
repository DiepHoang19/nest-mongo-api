import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

interface GoogleUser {
  id: string;
  email: string;
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
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return res.redirect(`http://localhost:3000?token=${token}`);
  }
}
