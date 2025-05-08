import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPurchasesRelations1746737427010 implements MigrationInterface {
  name = 'AddPurchasesRelations1746737427010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "customer_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "product_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "retailer_id" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "purchases" ADD "promotion_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "fk_purchases_customerId" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "fk_purchases_productId" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "fk_purchases_retailerId" FOREIGN KEY ("retailer_id") REFERENCES "retailers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "fk_purchases_promotionId" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "fk_purchases_promotionId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "fk_purchases_retailerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "fk_purchases_productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "fk_purchases_customerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "promotion_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "retailer_id"`,
    );
    await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "product_id"`);
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "customer_id"`,
    );
  }
}
