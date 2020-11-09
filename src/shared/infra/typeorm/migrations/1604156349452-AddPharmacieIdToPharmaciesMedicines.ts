import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddPharmacieIdToPharmaciesMedicines1604156349452
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pharmacies_medicines',
      new TableColumn({
        name: 'pharmacie_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'pharmacies_medicines',
      new TableForeignKey({
        name: 'PharmacieMedicine',
        columnNames: ['pharmacie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pharmacies',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'pharmacies_medicines',
      'PharmacieMedicine',
    );
    await queryRunner.dropColumn('pharmacies_medicines', 'pharmacie_id');
  }
}
