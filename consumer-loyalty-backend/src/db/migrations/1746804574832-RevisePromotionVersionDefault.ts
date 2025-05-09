import { MigrationInterface, QueryRunner } from "typeorm";

export class RevisePromotionVersionDefault1746804574832 implements MigrationInterface {
    name = 'RevisePromotionVersionDefault1746804574832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_latest_promotions"`);
        await queryRunner.query(`ALTER TABLE "promotions" ALTER COLUMN "version" SET DEFAULT '0'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_latest_promotions" ON "promotions" ("product_id", "retailer_id", "start_date", "end_date", "version") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_latest_promotions"`);
        await queryRunner.query(`ALTER TABLE "promotions" ALTER COLUMN "version" DROP DEFAULT`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_latest_promotions" ON "promotions" ("start_date", "end_date", "version", "product_id", "retailer_id") `);
    }

}
