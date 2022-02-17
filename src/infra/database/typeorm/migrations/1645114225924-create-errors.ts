import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { tableNames } from '../constants';

export class createErrors1645114225924 implements MigrationInterface {
  private readonly TABLE_NAME = tableNames.ERRORS;

  private readonly USER_ID_COLUMN_NAME = 'user_id';

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: this.TABLE_NAME,
        columns: [
          {
            isPrimary: true,
            name: 'id',
            type: 'uuid',
          },
          {
            name: this.USER_ID_COLUMN_NAME,
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'resource_url',
            type: 'varchar',
          },
          {
            name: 'http_method',
            type: 'varchar',
          },
          {
            name: 'stack',
            type: 'varchar',
          },
          {
            name: 'exception_was_thrown_in',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: [this.USER_ID_COLUMN_NAME],
            referencedColumnNames: ['id'],
            referencedTableName: tableNames.USERS,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.TABLE_NAME);
  }
}
