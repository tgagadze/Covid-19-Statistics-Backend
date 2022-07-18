import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';

import { Country } from './entity/country.entity';

@Injectable()
export class CountryService implements OnModuleInit {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const count = await this.countryRepository.count();

    if (count > 0) return;

    try {
      let countries: Country[] = [];
      const url = `${this.configService.get('API_BASE_URL')}/countries`;
      const res = await axios.get(url);
      if (Array.isArray(res.data)) {
        countries = res.data.map((c: Country) => {
          return this.countryRepository.create({
            ...c,
          });
        });
        this.countryRepository.insert(countries);
      }
    } catch (err) {}
  }

  getAll() {
    return this.countryRepository.find();
  }

  getByCode(code: string) {
    return this.countryRepository.findOne({ where: { code } });
  }
}
