import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddMedicineIdToPharmacies1604155751955
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pharmacies_medicines',
      new TableColumn({
        name: 'medicine_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'pharmacies_medicines',
      new TableForeignKey({
        name: 'MedicinePharmacie',
        columnNames: ['medicine_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'medicines',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'pharmacies_medicines',
      'MedicinePharmacie',
    );
    await queryRunner.dropColumn('pharmacies_medicines', 'medicine_id');
  }
}
