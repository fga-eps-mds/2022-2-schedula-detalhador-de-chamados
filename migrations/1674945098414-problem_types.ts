import { MigrationInterface, QueryRunner } from 'typeorm';

export class problemTypes1674945098414 implements MigrationInterface {
  name = 'problemTypes1674945098414';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "problem_category" RENAME COLUMN "deletedAt" TO "deleted_at"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "problem_category" RENAME COLUMN "deleted_at" TO "deletedAt"`,
    );
  }
}
