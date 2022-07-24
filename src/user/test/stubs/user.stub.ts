import { User } from '../../entity/user.entity';

export const userStub = (): User => ({
  id: 1,
  email: 'test@mail.com',
  password: '123',
  createdAt: new Date('2022-07-24T07:32:15.575Z'),
  updatedAt: new Date('2022-07-24T07:32:15.575Z'),
});
