import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterEventAddThumbnail1669480067945 implements MigrationInterface {
  name = 'alterEventAddThumbnail1669480067945';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD "thumbnail" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "thumbnail"`);
  }
}
