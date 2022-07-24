import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiParam,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ACCESS_TOKEN_KEY } from '../constants';
import { User } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { CurrentUser } from './decorators/current_user.decorator';
import { SignInDto, SignUpDto } from './dto';
import { SignInPayload } from './dto/sign-in-payload.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiParam({ type: SignUpDto, name: 'signup', required: true })
  @ApiOkResponse({
    type: User,
    status: HttpStatus.CREATED,
    description: 'Created user object',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Email already registered',
    type: ForbiddenException,
  })
  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiParam({ type: SignInDto, name: 'signin', required: true })
  @ApiOkResponse({
    type: SignInPayload,
    status: HttpStatus.OK,
    description: 'User and jwt-access-token',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'invalid.credentials, when email or password is incorrect',
    type: ForbiddenException,
  })
  @Public()
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOkResponse({
    type: User,
    status: HttpStatus.OK,
    description: 'User',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'When token is invalid',
    type: UnauthorizedException,
  })
  @Get('me')
  @ApiBearerAuth(ACCESS_TOKEN_KEY)
  me(@CurrentUser() currentUser: User) {
    return this.authService.getUserById(currentUser.id);
  }
}
