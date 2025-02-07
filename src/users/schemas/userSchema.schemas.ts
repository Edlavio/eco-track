import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ default: () => uuidv4() })
  _id: string;

  @Prop({ default: () => uuidv4(), index: true, unique: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Number, default: 0 })
  points: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
