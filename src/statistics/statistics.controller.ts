import { Body, Controller, Get } from '@nestjs/common';

import { GetStatisticsDto } from './dto';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Get('/get-by-country')
  getByCountryCode(@Body() { code }: GetStatisticsDto) {
    return this.statisticsService.getByCountryCode(code);
  }

  @Get('/total')
  getTotalStatistics() {
    return this.statisticsService.getTotalStatistics();
  }

  @Get('/latest')
  getLatest() {
    return this.statisticsService.getLatest();
  }
}
