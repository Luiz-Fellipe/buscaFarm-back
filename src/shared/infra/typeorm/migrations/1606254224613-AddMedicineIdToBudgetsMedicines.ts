import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddMedicineIdToBudgetsMedicines1606254224613
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'budgets_medicines',
      new TableColumn({
        name: 'medicine_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'budgets_medicines',
      new TableForeignKey({
        name: 'MedicineBudget',
        columnNames: ['medicine_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'medicines',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('budgets_medicines', 'MedicineBudget');
    await queryRunner.dropColumn('budgets_medicines', 'medicine_id');
  }
}
