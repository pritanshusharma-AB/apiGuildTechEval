import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPurchases1746725635000 implements MigrationInterface {
  name = 'AddPurchases1746725635000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "purchases" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "transaction_id" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "sale_price" integer NOT NULL, "total_price" integer NOT NULL, "award_rate" integer NOT NULL DEFAULT '0', "points_earned" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id")); COMMENT ON COLUMN "purchases"."quantity" IS 'count of items purchased'; COMMENT ON COLUMN "purchases"."sale_price" IS 'snapshot of product sale_price at purchase time'; COMMENT ON COLUMN "purchases"."total_price" IS 'calculated total price at purchase time: sale_price * quantity'; COMMENT ON COLUMN "purchases"."award_rate" IS 'snapshot of award_rate at purchase time'; COMMENT ON COLUMN "purchases"."points_earned" IS 'snapshot of points_earned at purchase time'`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_purchase_transaction_id" ON "purchases" ("transaction_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."idx_purchase_transaction_id"`,
    );
    await queryRunner.query(`DROP TABLE "purchases"`);
  }
}
