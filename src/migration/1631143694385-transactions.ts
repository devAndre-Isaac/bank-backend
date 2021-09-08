import {MigrationInterface, QueryRunner} from "typeorm";

export class transactions1631143694385 implements MigrationInterface {
    name = 'transactions1631143694385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."communUser" RENAME COLUMN "cpf" TO "cpf_cnpj"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "public"."communUser" RENAME COLUMN "cpf_cnpj" TO "cpf"`);
    }

}
