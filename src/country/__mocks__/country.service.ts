import { countryStub } from '../test/stubs/country.stub';

export const CountryService = jest.fn().mockReturnValue({
  getAll: jest.fn().mockResolvedValue([countryStub()]),
  getByCode: jest.fn().mockResolvedValue(countryStub()),
});
