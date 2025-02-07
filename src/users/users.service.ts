import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/userSchema.schemas';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  create(createUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    const users = this.userModel.find().select('-password');

    return users;
  }

  findByEmail(email: string) {
    const userExist = this.userModel.findOne({ email: email });

    return userExist;
  }

  findOne(id: string) {
    const user = this.userModel
      .findOne({
        userId: id,
      })
      .select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findOneAndUpdate(
        { userId: id },
        {
          name: updateUserDto.name,
          email: updateUserDto.email,
        },
      )
      .select('-password');
  }

  async remove(email: string) {
    await this.userModel.deleteOne({
      email,
    });

    return {
      message: 'User deleted successfully',
    };
  }
}
