import { Country } from 'src/country/entity/country.entity';

export const countryStub = (): Country => ({
  id: 1,
  code: 'GE',
  name: {
    ka: 'საქართველო',
    en: 'Georgia',
  },
  statistics: [],
  createdAt: new Date('2022-07-24T07:32:15.575Z'),
  updatedAt: new Date('2022-07-24T07:32:15.575Z'),
});
