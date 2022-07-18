import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import axios from 'axios';

import { CountryService } from '../country/country.service';
import { isToday } from '../utils';
import { Statistics } from './entity/statistics.entity';
import { GET_TOTAL_STATISTICS_QUERY } from './queries';

interface Statistic {
  country: string;
  code: string;
  confirmed: number;
  recovered: number;
  critical: number;
  deaths: number;
}

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private readonly statisticsRepository: Repository<Statistics>,
    private readonly countryService: CountryService,
    private readonly configService: ConfigService,
  ) {}

  async getByCountryCodeFromApi(code: string) {
    const url = `${this.configService.get(
      'API_BASE_URL',
    )}/get-country-statistics`;
    const res = await axios.post(url, { code });
    return res.data;
  }

  async updateStatistics(statistics: Statistic[]) {
    for (const statistic of statistics) {
      const { code, confirmed, recovered, critical, deaths } = statistic;
      const existing = await this.statisticsRepository.findOne({
        where: {
          country: { code: code },
        },
        order: { createdAt: 'DESC' },
        relations: ['country'],
      });
      if (existing && isToday(existing.createdAt)) {
        existing.confirmed = confirmed;
        existing.recovered = recovered;
        existing.critical = recovered;
        existing.deaths = deaths;
        this.statisticsRepository.save(existing);
      } else {
        const country = await this.countryService.getByCode(code);
        const statistics = this.statisticsRepository.create({
          country,
          confirmed,
          recovered,
          critical,
          deaths,
        });
        this.statisticsRepository.save(statistics);
      }
    }
  }

  async getByCountryCode(code: string) {
    const statistics = await this.statisticsRepository.findOne({
      where: { country: { code } },
      order: { createdAt: 'DESC' },
      relations: ['country'],
    });
    if (!statistics) {
      throw new NotFoundException('Record not found');
    }
    return statistics;
  }

  async getTotalStatistics() {
    const data = await this.statisticsRepository.query(
      GET_TOTAL_STATISTICS_QUERY,
    );
    return data?.[0];
  }
}
