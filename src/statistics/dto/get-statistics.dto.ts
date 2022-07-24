import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetStatisticsDto {
  @ApiProperty({ example: 'GE' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value) {
      return value.toUpperCase();
    }
  })
  code: string;
}
