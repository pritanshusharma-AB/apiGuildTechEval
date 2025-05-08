import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPromotions1746725101788 implements MigrationInterface {
  name = 'AddPromotions1746725101788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "promotions" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "start_date" date NOT NULL, "end_date" date NOT NULL, "award_rate" integer NOT NULL DEFAULT '0', "version" integer NOT NULL, CONSTRAINT "PK_380cecbbe3ac11f0e5a7c452c34" PRIMARY KEY ("id")); COMMENT ON COLUMN "promotions"."start_date" IS 'format yyyy-mm-dd'; COMMENT ON COLUMN "promotions"."end_date" IS 'format yyyy-mm-dd'; COMMENT ON COLUMN "promotions"."award_rate" IS 'points per dollar multiplier. 100 means 100 points per dollar spent'; COMMENT ON COLUMN "promotions"."version" IS 'version counter; highest is most recent'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "promotions"`);
  }
}
