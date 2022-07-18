import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetStatisticsDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value) {
      return value.toUpperCase();
    }
  })
  code: string;
}
