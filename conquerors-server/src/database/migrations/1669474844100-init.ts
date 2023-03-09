import { MigrationInterface, QueryRunner } from "typeorm";

export class init1669474844100 implements MigrationInterface {
    name = 'init1669474844100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "title" character varying NOT NULL, "location" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "authorIdId" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "displayName" character varying, "lastLoginAt" TIMESTAMP, "address" character varying, "phoneNumber" character varying, "avatarUrl" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying, "userId" uuid, CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "images" json NOT NULL DEFAULT '[]', "likeCount" integer NOT NULL DEFAULT '0', "dislikeCount" integer NOT NULL DEFAULT '0', "authorId" uuid, "locationId" uuid, CONSTRAINT "REL_ba07795b0c8471bfdf0cb687ed" UNIQUE ("locationId"), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "postLocation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "street" character varying, "ward" character varying, "district" character varying, "province" character varying, "post_id" uuid, CONSTRAINT "REL_acf098cdfb6e304e07a72d2993" UNIQUE ("post_id"), CONSTRAINT "PK_f0a1c81c5d97133667c21bf81cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reaction_status_enum" AS ENUM('like', 'dislike')`);
        await queryRunner.query(`CREATE TABLE "reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "status" "public"."reaction_status_enum" NOT NULL, "userId" uuid, "postId" uuid, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_participants_ids_user" ("eventId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_d83c23156da57b67bbd8c2a63b0" PRIMARY KEY ("eventId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1d87e1452ad0834791869ab134" ON "event_participants_ids_user" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_feaa9c23de00f363e062d853d8" ON "event_participants_ids_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_events_event" ("userId" uuid NOT NULL, "eventId" uuid NOT NULL, CONSTRAINT "PK_11948eb9a443f34df93cac35feb" PRIMARY KEY ("userId", "eventId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_507e9d8e231d089b5c4d44cce0" ON "user_events_event" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c885fff747e43934134ceb67d3" ON "user_events_event" ("eventId") `);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_f6e4bd7a6c608c935870e9dd5f6" FOREIGN KEY ("authorIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_ba07795b0c8471bfdf0cb687eda" FOREIGN KEY ("locationId") REFERENCES "postLocation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "postLocation" ADD CONSTRAINT "FK_acf098cdfb6e304e07a72d2993a" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_e58a09ab17e3ce4c47a1a330ae1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_dc3aeb83dc815f9f22ebfa7785f" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_participants_ids_user" ADD CONSTRAINT "FK_1d87e1452ad0834791869ab134a" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_participants_ids_user" ADD CONSTRAINT "FK_feaa9c23de00f363e062d853d89" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_events_event" ADD CONSTRAINT "FK_507e9d8e231d089b5c4d44cce00" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_events_event" ADD CONSTRAINT "FK_c885fff747e43934134ceb67d33" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_events_event" DROP CONSTRAINT "FK_c885fff747e43934134ceb67d33"`);
        await queryRunner.query(`ALTER TABLE "user_events_event" DROP CONSTRAINT "FK_507e9d8e231d089b5c4d44cce00"`);
        await queryRunner.query(`ALTER TABLE "event_participants_ids_user" DROP CONSTRAINT "FK_feaa9c23de00f363e062d853d89"`);
        await queryRunner.query(`ALTER TABLE "event_participants_ids_user" DROP CONSTRAINT "FK_1d87e1452ad0834791869ab134a"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_dc3aeb83dc815f9f22ebfa7785f"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_e58a09ab17e3ce4c47a1a330ae1"`);
        await queryRunner.query(`ALTER TABLE "postLocation" DROP CONSTRAINT "FK_acf098cdfb6e304e07a72d2993a"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_ba07795b0c8471bfdf0cb687eda"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_f6e4bd7a6c608c935870e9dd5f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c885fff747e43934134ceb67d3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_507e9d8e231d089b5c4d44cce0"`);
        await queryRunner.query(`DROP TABLE "user_events_event"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_feaa9c23de00f363e062d853d8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1d87e1452ad0834791869ab134"`);
        await queryRunner.query(`DROP TABLE "event_participants_ids_user"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TYPE "public"."reaction_status_enum"`);
        await queryRunner.query(`DROP TABLE "postLocation"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
