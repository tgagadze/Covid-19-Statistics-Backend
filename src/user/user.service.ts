import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(email: string, password: string) {
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      throw new ForbiddenException('email.already.registered');
    }

    const user = new User();
    user.email = email;
    user.password = password;

    return this.userRepository.save(user);
  }

  getByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  getById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
