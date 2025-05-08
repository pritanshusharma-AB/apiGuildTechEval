import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCustomers1746718590212 implements MigrationInterface {
  name = 'AddCustomers1746718590212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "point_balance" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
