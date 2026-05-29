import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PostgresDbModule } from '../postgres-db.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PostgresDbModule, AuthModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
