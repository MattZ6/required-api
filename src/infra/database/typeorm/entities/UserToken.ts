import { randomUUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUserToken } from '@domain/models/UserToken';

import { tableNames } from '../constants';

@Entity(tableNames.USER_TOKENS)
export class UserToken implements IUserToken {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column()
  user_id: string;

  @Column()
  expires_in: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
