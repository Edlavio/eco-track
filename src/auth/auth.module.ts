import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/userSchema.schemas';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    UsersService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
