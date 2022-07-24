import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Country } from '../../country/entity/country.entity';

@Entity()
export class Statistics {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'int' })
  confirmed: number;

  @ApiProperty()
  @Column({ type: 'int' })
  recovered: number;

  @ApiProperty()
  @Column({ type: 'int' })
  critical: number;

  @ApiProperty()
  @Column({ type: 'int' })
  deaths: number;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    type: (type) => Country,
    isArray: true,
  })
  @ManyToOne(() => Country, (country) => country.statistics)
  country: Country;
}
