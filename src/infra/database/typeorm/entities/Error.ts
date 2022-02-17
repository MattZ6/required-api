import { randomUUID } from 'crypto';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { IError } from '@domain/models/Error';

import { tableNames } from '../constants';

@Entity(tableNames.ERRORS)
export class Error implements IError {
  @PrimaryColumn()
  id: string;

  @Column()
  stack: string;

  @Column()
  user_id?: string;

  @Column()
  resource_url: string;

  @Column()
  http_method: string;

  @Column()
  exception_was_thrown_in: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
