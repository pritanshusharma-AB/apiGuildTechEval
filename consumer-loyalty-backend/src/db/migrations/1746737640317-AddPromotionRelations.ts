import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPromotionRelations1746737640317 implements MigrationInterface {
  name = 'AddPromotionRelations1746737640317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "promotions" DROP CONSTRAINT "fk_promotions_product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ADD "retailer_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ADD CONSTRAINT "fk_promotions_productId" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ADD CONSTRAINT "fk_promotions_retailerId" FOREIGN KEY ("retailer_id") REFERENCES "retailers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "promotions" DROP CONSTRAINT "fk_promotions_retailerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" DROP CONSTRAINT "fk_promotions_productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" DROP COLUMN "retailer_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ADD CONSTRAINT "fk_promotions_product_id" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
