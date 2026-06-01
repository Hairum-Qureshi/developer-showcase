import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PostgresDbModule } from '../postgres-db.module';

@Module({
  imports: [PostgresDbModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
