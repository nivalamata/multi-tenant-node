import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOwnerTable1531140475129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table(
            {
                name: 'owner',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                    }, {
                        name: 'name',
                        type: 'varchar',
                        length: '20',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'empid',
                        type: 'varchar',
                        length: '20',
                        isPrimary: false,
                        isNullable: false,
                    },
                ],
                uniques: [
                    {
                        columnNames: [
                            'empid',
                        ],
                    },
                ],
            });
        await queryRunner.createTable(table);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('owner');
    }

}
