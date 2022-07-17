import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password: userPassword } = signUpDto;
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const user = await this.userService.create(email, hashedPassword);
    const { password, ...rest } = user;
    const accessToken = await this.createAccessToken(user);
    return { user: rest, accessToken };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new ForbiddenException('invalid credentials');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new ForbiddenException('invalid credentials');
    }

    const accessToken = await this.createAccessToken(user);
    const { password: userPassword, ...rest } = user;

    return { accessToken, user: rest };
  }

  private async createAccessToken(user: User) {
    const { email, id } = user;
    const access_token = await this.jwtService.sign(
      { id, email },
      {
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    return access_token;
  }
}
