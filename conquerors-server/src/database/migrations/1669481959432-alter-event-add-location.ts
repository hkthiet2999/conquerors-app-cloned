import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterEventAddLocation1669481959432 implements MigrationInterface {
  name = 'alterEventAddLocation1669481959432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "location" TO "locationId"`);
    await queryRunner.query(
      `CREATE TABLE "eventLocation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "street" character varying, "ward" character varying, "district" character varying, "province" character varying, "eventId" uuid, CONSTRAINT "REL_c6ac634221e4fa956d2b40872b" UNIQUE ("eventId"), CONSTRAINT "PK_499ce491c7f14cbcecf0184fc6c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "locationId"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "locationId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "UQ_3abacb54776ac9da25ca49c609f" UNIQUE ("locationId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "eventLocation" ADD CONSTRAINT "FK_c6ac634221e4fa956d2b40872b6" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_3abacb54776ac9da25ca49c609f" FOREIGN KEY ("locationId") REFERENCES "eventLocation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_3abacb54776ac9da25ca49c609f"`);
    await queryRunner.query(`ALTER TABLE "eventLocation" DROP CONSTRAINT "FK_c6ac634221e4fa956d2b40872b6"`);
    await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "UQ_3abacb54776ac9da25ca49c609f"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "locationId"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "locationId" character varying NOT NULL`);
    await queryRunner.query(`DROP TABLE "eventLocation"`);
    await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "locationId" TO "location"`);
  }
}
