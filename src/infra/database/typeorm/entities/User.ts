import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as generateUuid } from 'uuid';

import { IUserModel } from '@domain/models/User';

import { tableNames } from '../constants';

@Entity(tableNames.USERS)
export class User implements IUserModel {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = generateUuid();
    }
  }
}
