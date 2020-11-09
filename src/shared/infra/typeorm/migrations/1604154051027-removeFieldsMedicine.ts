import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class removeFieldsMedicine1604154051027
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('medicines', 'pharmacie_id');
    await queryRunner.dropColumn('medicines', 'price');
    await queryRunner.dropColumn('medicines', 'amount');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'medicines',
      new TableColumn({
        name: 'pharmacie_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'medicines',
      new TableForeignKey({
        name: 'MedicinePharmacie',
        columnNames: ['pharmacie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pharmacies',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'medicines',
      new TableColumn({
        name: 'amount',
        type: 'integer',
        isNullable: false,
        isUnique: false,
      }),
    );

    await queryRunner.addColumn(
      'medicines',
      new TableColumn({
        name: 'price',
        type: 'float',
        isNullable: false,
        isUnique: false,
      }),
    );
  }
}
