import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEmployees1597445121105
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'employee_position_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'pharmacie_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'EmployeeUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'EmployeePositionId',
        columnNames: ['employee_position_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employees_position',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'employees',
      new TableForeignKey({
        name: 'EmployeePharmacie',
        columnNames: ['pharmacie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pharmacies',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('employees', 'EmployeeUser');
    await queryRunner.dropForeignKey('employees', 'EmployeePositionId');
    await queryRunner.dropForeignKey('employees', 'EmployeePharmacie');

    await queryRunner.dropTable('employees');
  }
}
