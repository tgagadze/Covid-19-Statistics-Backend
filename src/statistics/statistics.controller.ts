import { Body, Controller, Get, Post, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN_KEY } from '../constants';

import { GetStatisticsDto, StatisticDto } from './dto';
import { Statistics } from './entity/statistics.entity';
import { StatisticsService } from './statistics.service';

@ApiBearerAuth(ACCESS_TOKEN_KEY)
@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiResponse({ type: Statistics, status: HttpStatus.OK })
  @Post('/get-by-country')
  getByCountryCode(@Body() { code }: GetStatisticsDto): Promise<Statistics> {
    return this.statisticsService.getByCountryCode(code);
  }

  @ApiResponse({ type: StatisticDto, status: HttpStatus.OK })
  @Get('/total')
  getTotalStatistics() {
    return this.statisticsService.getTotalStatistics();
  }

  @ApiResponse({ type: [Statistics], status: HttpStatus.OK })
  @Get('/latest')
  getLatest(): Promise<Statistics[]> {
    return this.statisticsService.getLatest();
  }
}
