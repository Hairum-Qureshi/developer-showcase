import { Module } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const sql = neon(configService.get<string>('NEON_DB_URL')!);

const dbProvider = {
  provide: 'POSTGRES_POOL',
  useValue: sql,
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class PostgresDbModule {}
