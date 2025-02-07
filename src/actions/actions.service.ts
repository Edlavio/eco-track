/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Action } from './schemas/actionSchema.schemas';
import { Model } from 'mongoose';
import { CategoryPoints } from 'utils/categories';
import { User } from 'src/users/schemas/userSchema.schemas';
import { UpdateActionCategoryDto } from './dto/update-action-category.dto';

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action.name) private actionModel: Model<Action>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createActionDto: CreateActionDto) {
    const points = CategoryPoints[createActionDto.category];

    const action = new this.actionModel({
      ...createActionDto,
      points,
    });
    await action.save();

    await this.userModel.findByIdAndUpdate(action.userId, {
      $inc: { points: points },
    });

    const { actionId, _id, ...actionData } = action.toObject();

    return {
      id: actionId,
      ...actionData,
    };
  }

  findAll() {
    const actions = this.actionModel.find();

    return actions;
  }

  async findOne(id: string) {
    return await this.actionModel.findOne({ actionId: id }).select('-_id');
  }

  async findAllByUser(id: string) {
    return await this.actionModel.find({ userId: id }).select('-_id');
  }

  async update(id: string, updateActionDto: UpdateActionDto) {
    const action = await this.actionModel.findOne({ actionId: id });

    if (!action) {
      throw new NotFoundException('Action not found');
    }
    await action.updateOne(updateActionDto);

    return {
      message: 'Action updated successfully',
    };
  }

  async remove(id: string) {
    const action = await this.actionModel.findOne({ id });

    if (!action) {
      throw new NotFoundException('Action not found');
    }
    const points = CategoryPoints[action.category];

    await this.userModel.findByIdAndUpdate(action.userId, {
      $inc: { points: -points },
    });

    await action.deleteOne();

    return `Action with id ${action.id} deleted successfully`;
  }
}
