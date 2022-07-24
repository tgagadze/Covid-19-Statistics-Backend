import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { ACCESS_TOKEN_KEY } from './../constants/index';
import { CountryService } from './country.service';
import { Country } from './entity/country.entity';

@ApiBearerAuth(ACCESS_TOKEN_KEY)
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiOkResponse({ type: [Country], description: 'List all countries' })
  @Get('/')
  getCountries() {
    return this.countryService.getAll();
  }
}
