import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldAmountToBudgetsMedicines1606837058441
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'budgets_medicines',
      new TableColumn({
        name: 'amount',
        type: 'integer',
        isNullable: false,
        isUnique: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('budgets_medicines', 'amount');
  }
}
