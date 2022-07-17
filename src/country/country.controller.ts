import { Controller, Get } from '@nestjs/common';

import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/')
  getCountries() {
    return this.countryService.getAll();
  }
}
