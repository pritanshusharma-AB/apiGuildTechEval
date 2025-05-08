import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProducts1746719418590 implements MigrationInterface {
    name = 'AddProducts1746719418590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")); COMMENT ON COLUMN "products"."price" IS 'price in cents, not dollars'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_products_name" ON "products" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_products_name"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
