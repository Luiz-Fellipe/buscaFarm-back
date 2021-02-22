import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldRegisterToMedicines1614010771368
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'medicines',
      new TableColumn({
        name: 'register',
        type: 'varchar',
        isNullable: true,
        isUnique: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('medicines', 'register');
  }
}
