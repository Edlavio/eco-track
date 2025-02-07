/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const userExist = await this.usersService.findByEmail(createAuthDto.email);

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const user = await this.usersService.create({
      name: createAuthDto.name,
      email: createAuthDto.email,
      password: hashedPassword,
    });

    const { password, userId, _id, ...result } = user.toObject();
    return {
      id: userId,
      ...result,
    };
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ message: string; access_token: string }> {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const compare = await bcrypt.compare(signInDto.password, user.password);

    if (!compare) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      message: 'User authenticated successfully',
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '2d',
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async getUserInfo(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, userId, _id, ...result } = user.toObject();

    return {
      id: userId,
      ...result,
    };
  }
}
