import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../user/entity/user.entity';

export class SignInPayload {
  @ApiProperty({ type: String })
  accessToken: string;

  @ApiProperty({ type: User })
  user: User;
}
