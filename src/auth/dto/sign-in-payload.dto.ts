import { User } from '../../user/entity/user.entity';

export class SignInPayload {
  accessToken: string;
  user: User;
}
