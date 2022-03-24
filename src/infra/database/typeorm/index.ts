import { DataSource } from 'typeorm';

import {
  Error as ErrorEntity,
  User,
  UserToken,
} from '@infra/database/typeorm/entities';

export const AppDataSource = new DataSource({
  applicationName: 'AuthFlow',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  migrations: ['./src/infra/database/typeorm/migrations/*.ts'],
  entities: [ErrorEntity, User, UserToken],
});
