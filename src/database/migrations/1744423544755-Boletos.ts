import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Boletos1744423544755 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'boletos',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: 'nome_sacado',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'id_lote',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'valor',
                        type: 'decimal',
                    },
                    {
                        name: 'linha_digitavel',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'ativo',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'criado_em',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            'boletos',
            new TableForeignKey({
                columnNames: ['id_lote'],
                referencedTableName: 'lotes',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("boletos");
    }

}
