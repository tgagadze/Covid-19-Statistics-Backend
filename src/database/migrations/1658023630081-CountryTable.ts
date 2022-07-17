import { MigrationInterface, QueryRunner } from 'typeorm';

export class CountryTable1658023630081 implements MigrationInterface {
  name = 'CountryTable1658023630081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "country" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "country"`);
  }
}
