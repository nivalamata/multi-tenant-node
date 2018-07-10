import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddOwnerRelationToInventoryTable1531144633763 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey(
        {
            name: 'FK_INVENTORY_TO_OWNER',
            columnNames: ['ownerid'],
            referencedTableName: 'owner',
            referencedColumnNames: ['id'],
        });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('inventory', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('inventory', this.tableForeignKey);
    }
}
