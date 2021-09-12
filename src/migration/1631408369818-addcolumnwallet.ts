import {MigrationInterface, QueryRunner} from "typeorm";

export class addcolumnwallet1631408369818 implements MigrationInterface {
    name = 'addcolumnwallet1631408369818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."communUser" ADD "wallet" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."sellers" ADD "wallet" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."transactions" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."transactions" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "public"."sellers" DROP COLUMN "wallet"`);
        await queryRunner.query(`ALTER TABLE "public"."communUser" DROP COLUMN "wallet"`);
    }

}
