import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';

import { AuthService } from './auth.service';
import { Public } from './decorators';
import { CurrentUser } from './decorators/current_user.decorator';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('me')
  me(@CurrentUser() currentUser: User) {
    return this.authService.getUserById(currentUser.id);
  }
}
