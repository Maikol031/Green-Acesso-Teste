import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Lotes1744423544754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "lotes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        isNullable: false,
                        generationStrategy: "increment",
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "ativo",
                        type: "boolean",
                    },
                    {
                        name: "criado_em",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    }
                ],
            }),
            true,
        );
        await queryRunner.query(`
            INSERT INTO lotes (id, nome, ativo)
            VALUES
              (3, '0017', true),
              (6, '0018', true),
              (7, '0019', true);
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("lotes");
    }

}
