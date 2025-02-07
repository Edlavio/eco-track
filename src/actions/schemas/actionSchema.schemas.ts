import { Categories } from 'utils/categories';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ActionDocument = HydratedDocument<Action>;

@Schema({ timestamps: true })
export class Action {
  @Prop({ default: () => uuidv4(), index: true, unique: true })
  actionId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, enum: Categories, required: true })
  category: string;

  @Prop({
    required: true,
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not a valid number',
    },
  })
  points: number;

  @Prop({ type: String, ref: 'User' })
  userId: string;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
