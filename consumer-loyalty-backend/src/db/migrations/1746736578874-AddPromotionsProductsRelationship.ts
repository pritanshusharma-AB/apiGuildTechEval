import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPromotionsProductsRelationship1746736578874
  implements MigrationInterface
{
  name = 'AddPromotionsProductsRelationship1746736578874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."idx_purchase_transaction_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ADD "product_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_purchases_transaction_id" ON "purchases" ("transaction_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ADD CONSTRAINT "fk_promotions_product_id" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "promotions" DROP CONSTRAINT "fk_promotions_product_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_purchases_transaction_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" DROP COLUMN "product_id"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_purchase_transaction_id" ON "purchases" ("transaction_id") `,
    );
  }
}
