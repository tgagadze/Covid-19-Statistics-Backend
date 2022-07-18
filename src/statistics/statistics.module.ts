import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CountryModule } from '../country/country.module';
import { StatisticsSchedule } from './statistics.schedule';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { Statistics } from './entity/statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statistics]), CountryModule],
  providers: [StatisticsService, StatisticsSchedule],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
