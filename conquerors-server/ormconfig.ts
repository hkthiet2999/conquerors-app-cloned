import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE_NAME,
  migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrationsTableName: process.env.MIGRATIONS_TABLE_NAME,
  logging: true,
  cli: {
    entitiesDir: __dirname + '/**/*.entity{.ts,.js}',
    migrationsDir: __dirname + '/src/database/migrations',
  },
} as any);
