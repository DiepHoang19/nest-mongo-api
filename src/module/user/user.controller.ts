import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

export class DeleteManyUserDto {
  user_id: { id: string }[];
}

@Controller('user')
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

  // @UseGuards(AuthGuard)
  @Get('/list')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/detail')
  findOneUser(@Query('user_id') user_id: string) {
    return this.userService.findOneUser(user_id);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return this.userService.deleteUserWhereId(id);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/many')
  async deleteManyUsers(@Body() dto: DeleteManyUserDto): Promise<any> {
    return this.userService.deleteUserWhereManyUser(dto.user_id);
  }
}
