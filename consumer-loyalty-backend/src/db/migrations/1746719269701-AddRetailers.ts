import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRetailers1746719269701 implements MigrationInterface {
  name = 'AddRetailers1746719269701';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "retailers" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "name" character varying NOT NULL, "auth_token" character varying NOT NULL, CONSTRAINT "PK_1228653999402b52e75d40b1c66" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_retailers_auth_token" ON "retailers" ("auth_token") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_retailers_auth_token"`);
    await queryRunner.query(`DROP TABLE "retailers"`);
  }
}
