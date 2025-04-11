import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  create(@Body() body: { full_name: string; email: string; password: string }) {
    const payload = {
      full_name: body.full_name,
      email: body.email,
      password: body.password,
    };
    return this.userService.create(payload);
  }

  @Post('/login')
  login(@Body() body: { email: string; password: string }) {
    const payload = {
      email: body.email,
      password: body.password,
    };
    return this.userService.login(payload);
  }

  @UseGuards(AuthGuard)
  @Get('/list')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/detail')
  findOneUser(@Query('user_id') user_id: string) {
    return this.userService.findOneUser(user_id);
  }
}
