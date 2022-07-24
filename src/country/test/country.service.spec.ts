import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions, Repository, FindManyOptions } from 'typeorm';

import { countryStub } from './stubs/country.stub';

import { CountryService } from '../country.service';
import { Country } from '../entity/country.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

describe('CountryService', () => {
  let service: CountryService;
  let config: ConfigService;
  let repository: Repository<Country>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getRepositoryToken(Country),
          useValue: {
            count: jest.fn().mockResolvedValue(0),
            findOne: jest.fn((options: FindOneOptions) => countryStub()),
            find: jest.fn((options: FindManyOptions) => [countryStub()]),
            insert: jest.fn(
              (
                entity:
                  | QueryDeepPartialEntity<Country>
                  | QueryDeepPartialEntity<Country>[],
              ) => entity,
            ),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'API_BASE_URL') {
                return 'https://devtest.ge';
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    repository = module.get(getRepositoryToken(Country));
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    describe('when getAll is called', () => {
      let countries: any;

      beforeEach(async () => {
        countries = await service.getAll();
      });

      test('then it should call countryRepository', () => {
        expect(repository.find).toHaveBeenCalled();
      });

      test('then it should return countries', () => {
        expect(countries).toEqual([countryStub()]);
      });
    });
  });

  describe('getByCode', () => {
    describe('when getByCode is called', () => {
      let country: Country;
      const code = countryStub().code;
      const findOneOptions: FindOneOptions = {
        where: { code },
      };

      beforeEach(async () => {
        country = await service.getByCode(code);
      });

      test('then it should call countryRepository', () => {
        expect(repository.findOne).toHaveBeenCalled();
      });
      test('then it should call countryRepository findOne with', () => {
        expect(repository.findOne).toHaveBeenCalledWith(findOneOptions);
      });

      test('then it should return country', () => {
        expect(country).toEqual(countryStub());
      });
    });
  });

  // describe('onModuleInit', () => {
  //   beforeEach(async () => {
  //     service.onModuleInit();
  //   });

  //   describe('when onModuleInit is called and count is = 0', () => {
  //     test('then countryRepository count should be called', () => {
  //       expect(repository.count).toHaveBeenCalled();
  //     });

  //     test('then configService get should be called', () => {
  //       expect(config.get).toHaveBeenCalled();
  //     });
  //   });
  // });
});
