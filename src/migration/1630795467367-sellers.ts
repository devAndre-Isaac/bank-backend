import {MigrationInterface, QueryRunner} from "typeorm";

export class sellers1630795467367 implements MigrationInterface {
    name = 'sellers1630795467367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sellers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "complete_name" character varying NOT NULL, "cpf_cnpj" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sellers"`);
    }

}
