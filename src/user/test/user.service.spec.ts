import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { UserService } from '../user.service';
import { userStub } from './stubs/user.stub';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn((options: FindOneOptions) => userStub()),
            save: jest.fn((user: User) => user),
            create: jest.fn((userObject: any) => userStub()),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let user: User;
      const { email, password } = userStub();
      beforeEach(async () => {
        user = await userService.create(email, password);
      });

      test('then it should call userRepository create', () => {
        expect(userRepository.create).toHaveBeenCalled();
      });

      test('then it should call userRepository save', () => {
        expect(userRepository.save).toHaveBeenCalled();
      });

      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getById', () => {
    describe('when getById is called', () => {
      let user: User;
      const { id } = userStub();
      const findOneOptions: FindOneOptions = {
        where: { id },
      };

      beforeEach(async () => {
        user = await userService.getById(id);
      });

      test('then it should call userRepository findOne with', () => {
        expect(userRepository.findOne).toHaveBeenCalledWith(findOneOptions);
      });

      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
