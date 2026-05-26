import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response, CookieOptions } from 'express';
import * as types from '../types';
import { AuthService } from './auth.service';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { SignUpDto } from '../DTOs/signUp.dto';
import { SignInDto } from '../DTOs/signIn.dto';
import express from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private createCookie(res: Response, jwtToken: string) {
    res.cookie('auth-session', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ jwtToken: string }> {
    const { jwtToken } = await this.authService.signUp(signUpDto);
    this.createCookie(res, jwtToken);
    return { jwtToken };
  }

  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ jwtToken: string }> {
    const { jwtToken } = await this.authService.signIn(signInDto);
    this.createCookie(res, jwtToken);
    return { jwtToken };
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
  //   @UseGuards(AuthGuard())
  getCurrentUser(@CurrentUser() user: types.UserPayload): types.UserPayload {
    return this.authService.getCurrentUser(user);
  }
}
