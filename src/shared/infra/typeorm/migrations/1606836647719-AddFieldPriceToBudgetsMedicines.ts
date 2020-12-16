import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldPriceToBudgetsMedicines1606836647719
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'budgets_medicines',
      new TableColumn({
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: false,
        isUnique: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('budgets_medicines', 'price');
  }
}
