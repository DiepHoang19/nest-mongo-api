import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

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

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
