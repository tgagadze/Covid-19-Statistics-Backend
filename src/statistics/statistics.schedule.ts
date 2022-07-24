import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CountryService } from '../country/country.service';
import { StatisticsService } from './statistics.service';
import { timeElapsed } from '../utils';

@Injectable()
export class StatisticsSchedule {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly countryService: CountryService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async updateStatistics() {
    console.log('fetching statistics...');
    const start = new Date();
    const allCountries = await this.countryService.getAll();

    const data = await Promise.all(
      allCountries.map((c) =>
        this.statisticsService.getByCountryCodeFromApi(c.code),
      ),
    );

    console.log('Fetching ended in: ', timeElapsed(start), ' seconds');

    this.statisticsService.updateStatistics(data);
  }
}
