import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../decorators/currentUser.decorator';
import type { UserPayload } from '../types';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('update-biography')
  @UseGuards(AuthGuard())
  async updateBiography(
    @CurrentUser() user: UserPayload,
    @Body('biography') biography: string,
  ) {
    return this.profileService.updateBiography(user.user_id, biography);
  }
}
