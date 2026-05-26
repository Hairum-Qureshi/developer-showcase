import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response, CookieOptions } from 'express';
import * as types from '../types';
import { AuthService } from './auth.service';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { SignUpDto } from '../DTOs/signUp.dto';
import { SignInDto } from '../DTOs/signIn.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpData: SignUpDto) {
    return this.authService.signUp(signUpData);
  }

  @Post('sign-in')
  signIn(@Body() signInData: SignInDto) {
    return this.authService.signIn(signInData);
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: Response): {
    message: string;
  } {
    res.clearCookie(
      'auth-session',
      this.authService.getAuthCookieOptions() as CookieOptions,
    );
    return { message: 'success' };
  }

  @Get('current-user')
  //   @UseGuards(AuthGuard())
  getCurrentUser(@CurrentUser() user: types.UserPayload): types.UserPayload {
    return this.authService.getCurrentUser(user);
  }
}
