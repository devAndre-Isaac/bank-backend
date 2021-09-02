import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserEntity1630622539932 implements MigrationInterface {
    name = 'createUserEntity1630622539932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "communUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "complete_name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_77029a02b329346b4879d5090fc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "communUser"`);
    }

}
