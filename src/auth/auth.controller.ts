import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from 'common/decorators/is-public.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiResponse({
    status: 200,
    example: {
      id: '18f32ec8-922c-4428-88bf-7b4c01464775',
      name: 'Pedro',
      email: 'edlavioe@pedro.com',
      points: 0,
      createdAt: '2025-02-07T21:07:27.752Z',
      updatedAt: '2025-02-07T21:07:27.752Z',
    },
  })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Public()
  @Post('login')
  @ApiResponse({
    status: 200,
    example: {
      message: 'User authenticated successfully',
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E2MTY5MGNlOWU2NzY0ODAzNTRiMWEiLCJlbWFpbCI6ImVkbGF2aW9lQG91dGxvb2suY29tIiwiaWF0IjoxNzM4OTYyMzM1LCJleHAiOjE3MzkxMzUxMzV9.uVWmrLV0M1J7JXj13ajaKRxYF50qnxcVTaspBXmcFo4',
    },
  })
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('me')
  @ApiResponse({
    status: 200,
    example: {
      id: '0ebcc6b1-f601-4d0c-91e6-18370a388638',
      name: 'Pedro Alberto',
      email: 'edlavioe@gmail.com',
      points: 0,
      createdAt: '2025-02-07T14:15:40.557Z',
      updatedAt: '2025-02-07T14:15:40.557Z',
      __v: 0,
    },
  })
  getUserInfo(@Request() req) {
    return this.authService.getUserInfo(req.user.email);
  }
}
