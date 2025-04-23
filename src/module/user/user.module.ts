import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/contants/contants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [UserService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
