import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLatestPromotionsIndex1746738050772
  implements MigrationInterface
{
  name = 'AddLatestPromotionsIndex1746738050772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_latest_promotions" ON "promotions" ("product_id", "retailer_id", "start_date", "end_date", "version") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_latest_promotions"`);
  }
}
