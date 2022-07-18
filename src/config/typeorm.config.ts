import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmAsyncConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<any> => {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: parseInt(configService.get('DB_PORT'), 10),
      username: configService.get('DB_USER'),
      database: configService.get('DB_NAME'),
      password: configService.get('DB_PASSWORD'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/../database/migrations',
      },
      synchronize: false,
      migration: true,
      logging: false,
    };
  },
};

export const typeOrmConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'nestjs',
  password: '123',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../database/migrations',
  },
  synchronize: false,
  migration: true,
  logging: false,
};
