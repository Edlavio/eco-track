import { Module } from '@nestjs/common';
import { ActionsModule } from './actions/actions.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: 'eco_track',
    }),
    ActionsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
