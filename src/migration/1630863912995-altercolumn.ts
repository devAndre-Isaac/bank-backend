import {MigrationInterface, QueryRunner} from "typeorm";

export class altercolumn1630863912995 implements MigrationInterface {
    name = 'altercolumn1630863912995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."communUser" RENAME COLUMN "cpf" TO "cpf_cnpj"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."communUser" RENAME COLUMN "cpf_cnpj" TO "cpf"`);
    }

}
