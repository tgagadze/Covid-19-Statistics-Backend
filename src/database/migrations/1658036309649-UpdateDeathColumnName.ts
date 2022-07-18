import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDeathColumnName1658036309649 implements MigrationInterface {
  name = 'UpdateDeathColumnName1658036309649';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statistics" RENAME COLUMN "death" TO "deaths"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statistics" RENAME COLUMN "deaths" TO "death"`,
    );
  }
}
