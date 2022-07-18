import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CountryService } from '../country/country.service';
import { StatisticsService } from './statistics.service';

@Injectable()
export class StatisticsSchedule {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly countryService: CountryService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async updateStatistics() {
    console.log('running cron...');
    const allCountries = await this.countryService.getAll();
    const start = new Date().getTime();
    const data = await Promise.all(
      allCountries.map((c) =>
        this.statisticsService.getByCountryCodeFromApi(c.code),
      ),
    );
    this.statisticsService.updateStatistics(data);
    console.log('ended in : ', (new Date().getTime() - start) / 1000);
  }
}
