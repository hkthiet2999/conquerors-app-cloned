import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { migrations } from './database';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { ResponseTransformInterceptor } from './interceptors/response.interceptor';
import { DataSource } from 'typeorm';
import { EventModule } from './modules/event/event.module';
import { PostsModule } from './modules/post/post.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ReactionModule } from './modules/reaction/reaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_DATABASE_NAME,
      migrations: migrations,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrationsTableName: process.env.MIGRATIONS_TABLE_NAME,
      logging: true,
      migrationsRun: Boolean(process.env.DB_MIGRATION_RUN),
    }),
    AuthModule,
    UsersModule,
    EventModule,
    PostsModule,
    CloudinaryModule,
    ReactionModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  exports: [AuthModule, UsersModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
