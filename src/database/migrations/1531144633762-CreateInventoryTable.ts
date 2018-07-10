import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInventoryTable1531140475128 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table(
            {
                name: 'inventory',
                columns: [
                    {
                        name: 'assetid',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                    }, {
                        name: 'assettype',
                        type: 'varchar',
                        length: '20',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'assetname',
                        type: 'text',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'department',
                        type: 'varchar',
                        length: '50',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'ownerid',
                        type: 'int',
                        isPrimary: false,
                        isNullable: false,
                    },
                ],
                uniques: [
                    {
                        columnNames: [
                            'ownerid',
                        ],
                    },
                ],
            });
        await queryRunner.createTable(table);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('inventory');
    }

}
