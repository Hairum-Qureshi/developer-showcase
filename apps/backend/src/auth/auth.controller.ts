import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import type { Response, CookieOptions } from 'express';
import * as types from '../types';
import { AuthService } from './auth.service';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { SignUpDto } from '../DTOs/signUp.dto';
import { SignInDto } from '../DTOs/signIn.dto';
import express from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private createCookie(res: Response, jwtToken: string) {
    res.cookie(
      'auth-session',
      jwtToken,
      this.authService.getAuthCookieOptions() as CookieOptions,
    );
  }

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ jwtToken: string; user_id: string }> {
    const { jwtToken, user_id } = await this.authService.signUp(signUpDto);
    this.createCookie(res, jwtToken);
    return { jwtToken, user_id };
  }

  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ jwtToken: string; user_id: string }> {
    const { jwtToken, user_id } = await this.authService.signIn(signInDto);
    this.createCookie(res, jwtToken);
    return { jwtToken, user_id };
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: express.Response): {
    message: string;
  } {
    res.clearCookie(
      'auth-session',
      this.authService.getAuthCookieOptions() as CookieOptions,
    );
    return { message: 'success' };
  }

  @Get('current-user')
  @UseGuards(AuthGuard())
  getCurrentUser(@CurrentUser() user: types.UserPayload): types.UserPayload {
    return this.authService.getCurrentUser(user);
  }
}
