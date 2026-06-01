import { Inject, Injectable } from '@nestjs/common';
import { UserPayload } from '../types';
import { SignUpDto } from '../DTOs/signUp.dto';
import bcrypt from 'bcrypt';
import SnowflakeId from 'snowflake-id';
import { SignInDto } from '../DTOs/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

// TODO - need to add validation for usernames so that they don't contain special characters that could break the SQL queries as well as reserved keywords or SQL injection attempts or invalid characters.

@Injectable()
export class AuthService {
  constructor(
    @Inject('POSTGRES_POOL') private readonly sql: any,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getAuthCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    };
  }

  getCurrentUser(user: UserPayload): UserPayload {
    return user;
  }

  async signIn(signInData: SignInDto) {
    const { email, password } = signInData;

    if (!email || !password) throw new Error('All fields are required');

    const user = await this.sql`SELECT * FROM users WHERE email = ${email}`;

    if (!user.length) throw new Error('Invalid credentials');

    const validPassword = await new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(password, user[0].password_hash, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    if (!validPassword) throw new Error('Invalid credentials');

    const [{ user_id }] = user;

    const jwtToken = this.jwtService.sign({
      user_id,
    });

    return { jwtToken, user_id };
  }

  async signUp(signUpData: SignUpDto) {
    const { email, username, password } = signUpData;

    if (!email || !username || !password)
      throw new Error('All fields are required');

    if (password.length < 6)
      throw new Error('Password must be at least 6 characters long');

    if (username.length < 6)
      throw new Error('Username must be at least 6 characters long');

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Invalid email format');
    }

    const emailExists = await this
      .sql`SELECT * FROM users WHERE email = ${email}`;

    if (emailExists.length > 0) {
      throw new Error('Email already in use');
    }

    const usernameExists = await this
      .sql`SELECT * FROM users WHERE username = ${username}`;

    if (usernameExists.length > 0) {
      throw new Error('Username already in use');
    }

    const salt = await new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) reject(err);
        resolve(salt);
      });
    });

    const hashedPassword = await new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    const snowflake = new SnowflakeId({
      mid: 42,
      offset: (2019 - 1970) * 31536000 * 1000,
    });

    const user_id = snowflake.generate();

    await this.sql`
      INSERT INTO users (user_id, email, username, password_hash)
      VALUES (${user_id}, ${email}, ${username}, ${hashedPassword})
    `;

    const jwtToken = this.jwtService.sign({
      user_id,
    });

    return { jwtToken, user_id };
  }

  async handleAccessToken(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const body = {
      client_id: this.configService.get<string>('GITHUB_CLIENT_ID'),
      client_secret: this.configService.get<string>('GITHUB_CLIENT_SECRET'),
      code: code,
    };

    const config = {
      headers: {
        Accept: 'application/json', // Ensures GitHub returns clean JSON instead of a query string
      },
    };

    const response = await firstValueFrom(
      this.httpService.post(url, body, config),
    );

    return response.data.access_token;
  }

  async getGitHubUserData(authorizationHeader: string) {
    const response = await firstValueFrom(
      this.httpService.get('https://api.github.com/user', {
        headers: {
          Authorization: authorizationHeader,
        },
      }),
    );

    const userEmails = await firstValueFrom(
      this.httpService.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: authorizationHeader,
        },
      }),
    );

    const { id, login, html_url, bio, avatar_url } = response.data;

    const [{ exists: userExists }] = await this
      .sql`SELECT EXISTS(SELECT 1 FROM users WHERE user_id=${id} AND github_oauth=true)`;

    if (userExists) {
      const jwtToken = this.jwtService.sign({
        user_id: id,
      });

      console.log({ jwtToken, user_id: id });

      return { jwtToken, user_id: id };
    } else {
      await this
        .sql`INSERT INTO users (user_id, email, password_hash, username, github_url, biography, avatar, github_oauth) VALUES (${id}, ${userEmails.data[0].email}, ${'883c6117-32fe-5eae-b5fe-1a54025ee972'}, ${login}, ${html_url}, ${bio}, ${avatar_url}, ${true})`;

      const jwtToken = this.jwtService.sign({
        user_id: id,
      });

      return { jwtToken, user_id: id };
    }

    return response.data;
  }
}
