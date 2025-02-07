import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Action, ActionSchema } from './schemas/actionSchema.schemas';
import { User, UserSchema } from 'src/users/schemas/userSchema.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Action.name, schema: ActionSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule {}
