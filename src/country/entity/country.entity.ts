import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Statistics } from '../../statistics/entity/statistics.entity';

interface NameProperties {
  [key: string]: string;
}
@Entity()
export class Country {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'GE' })
  @Column()
  code: string;

  @ApiProperty({ example: { ka: 'საქართველო', en: 'Georgia' } })
  @Column({ type: 'jsonb' })
  name: NameProperties;

  @ApiProperty({
    type: (type) => Statistics,
    isArray: true,
  })
  @OneToMany(() => Statistics, (statistics) => statistics.country, {
    onDelete: 'CASCADE',
  })
  statistics: Statistics[];

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
}
