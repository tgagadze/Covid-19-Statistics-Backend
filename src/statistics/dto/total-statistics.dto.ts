import { ApiProperty } from '@nestjs/swagger';

export class StatisticDto {
  @ApiProperty()
  confirmed: number;

  @ApiProperty()
  recovered: number;

  @ApiProperty()
  critical: number;

  @ApiProperty()
  deaths: number;
}
