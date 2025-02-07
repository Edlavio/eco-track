import { Connection } from 'mongoose';
import { ActionSchema } from './schemas/actionSchema.schemas';

export const catsProviders = [
  {
    provide: 'ACTION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Action', ActionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
