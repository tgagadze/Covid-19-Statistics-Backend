import { Country } from './entity/country.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
