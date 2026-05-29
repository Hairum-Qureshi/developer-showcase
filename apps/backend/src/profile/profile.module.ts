import { Body, Module, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PostgresDbModule } from '../postgres-db.module';
import { AuthModule } from '../auth/auth.module';
import * as types from '../types';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { AuthGuard } from '@nestjs/passport';

@Module({
  imports: [PostgresDbModule, AuthModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('update-biography')
  @UseGuards(AuthGuard())
  async updateBiography(
    @CurrentUser() user: types.UserPayload,
    @Body('biography') biography: string,
  ) {
    return this.profileService.updateBiography(user.user_id, biography);
  }
}
