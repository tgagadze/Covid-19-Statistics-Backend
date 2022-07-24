import { Test, TestingModule } from '@nestjs/testing';

import { CountryController } from '../country.controller';
import { CountryService } from '../country.service';
import { countryStub } from './stubs/country.stub';

jest.mock('../country.service.ts');

describe('CountryController', () => {
  let countryController: CountryController;
  let countryService: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [CountryService],
    }).compile();

    countryController = module.get<CountryController>(CountryController);
    countryService = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(countryController).toBeDefined();
  });

  describe('getCountries', () => {
    describe('when getCountries is called', () => {
      let countries = [];
      beforeEach(async () => {
        countries = await countryController.getCountries();
      });

      test('then it should call countryService getAll method', () => {
        expect(countryService.getAll).toHaveBeenCalled();
      });

      test('then it should return all countries', () => {
        expect(countries).toEqual([countryStub()]);
      });
    });
  });
});
