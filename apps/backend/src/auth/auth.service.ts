import { Inject, Injectable } from '@nestjs/common';
import { UserPayload } from '../types';
import { SignUpDto } from '../DTOs/signUp.dto';
import bcrypt from 'bcrypt';
import SnowflakeId from 'snowflake-id';
import { SignInDto } from '../DTOs/signIn.dto';
import { JwtService } from '@nestjs/jwt';

// TODO - need to add validation for usernames so that they don't contain special characters that could break the SQL queries as well as reserved keywords or SQL injection attempts or invalid characters.

@Injectable()
export class AuthService {
  constructor(
    @Inject('POSTGRES_POOL') private readonly sql: any,
    private readonly jwtService: JwtService,
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
}
