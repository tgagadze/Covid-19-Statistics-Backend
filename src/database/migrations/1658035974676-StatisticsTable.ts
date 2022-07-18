import { MigrationInterface, QueryRunner } from 'typeorm';

export class StatisticsTable1658035974676 implements MigrationInterface {
  name = 'StatisticsTable1658035974676';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "statistics" ("id" SERIAL NOT NULL, "confirmed" integer NOT NULL, "recovered" integer NOT NULL, "critical" integer NOT NULL, "death" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "countryId" integer, CONSTRAINT "PK_c3769cca342381fa827a0f246a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" ADD CONSTRAINT "FK_3f319511824e823c8e5de0eb5f1" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statistics" DROP CONSTRAINT "FK_3f319511824e823c8e5de0eb5f1"`,
    );
    await queryRunner.query(`DROP TABLE "statistics"`);
  }
}
