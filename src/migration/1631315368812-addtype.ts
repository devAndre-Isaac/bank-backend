import {MigrationInterface, QueryRunner} from "typeorm";

export class addtype1631315368812 implements MigrationInterface {
    name = 'addtype1631315368812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."transactions" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."transactions" DROP COLUMN "type"`);
    }

}
