import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePurchasesTransactionId1746892594361
  implements MigrationInterface
{
  name = 'RemovePurchasesTransactionId1746892594361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."idx_purchases_transaction_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP COLUMN "transaction_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "transaction_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_purchases_transaction_id" ON "purchases" ("transaction_id") `,
    );
  }
}
