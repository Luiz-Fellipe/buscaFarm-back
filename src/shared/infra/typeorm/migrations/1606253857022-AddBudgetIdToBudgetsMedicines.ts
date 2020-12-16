import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddBudgetIdToBudgetsMedicines1606253857022
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'budgets_medicines',
      new TableColumn({
        name: 'budget_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'budgets_medicines',
      new TableForeignKey({
        name: 'BudgetMedicine',
        columnNames: ['budget_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'budgets',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('budgets_medicines', 'BudgetMedicine');
    await queryRunner.dropColumn('budgets_medicines', 'budget_id');
  }
}
