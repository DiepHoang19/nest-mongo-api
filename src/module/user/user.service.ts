/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { comparePassword, hashPassword } from 'src/utils/hash-password';
import { JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/contants/contants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(payload: {
    full_name: string;
    email: string;
    password: string;
  }): Promise<any> {
    const { full_name, email, password } = payload;
    const passwordHash = await hashPassword(password);
    const dataInsert = {
      full_name,
      email,
      password: passwordHash,
    };
    const createdUser = await this.userModel.create(dataInsert);

    const responseUser = createdUser.toObject() as any;
    delete responseUser.password;
    delete responseUser.__v;

    return {
      data: responseUser,
      status_code: HttpStatus.CREATED,
      message: 'success',
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneUser(user_id: string): Promise<any> {
    const dataUser = await this.userModel.findById(user_id).exec();
    const userObject = {
      full_name: dataUser?.full_name,
      email: dataUser?.email,
      role: dataUser?.role,
      _id: dataUser?.id,
    };
    return {
      data: userObject,
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }

  async login(payload: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException('Email không tồn tại');
    }

    const isMatch = await comparePassword(payload.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai mật khẩu');
    }

    const payloadToken = {
      sub: user._id,
      username: user.full_name,
      password: user.password,
      role: user.role,
    };
    const generateToken = await this.jwtService.signAsync(payloadToken, {
      secret: SECRET_KEY,
    });

    return {
      data: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        accessToken: generateToken,
      },
      status_code: HttpStatus.OK,
      message: 'success',
    };
  }
}
