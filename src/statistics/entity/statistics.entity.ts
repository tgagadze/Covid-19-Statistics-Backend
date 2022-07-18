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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  confirmed: number;

  @Column({ type: 'int' })
  recovered: number;

  @Column({ type: 'int' })
  critical: number;

  @Column({ type: 'int' })
  deaths: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Country, (country) => country.statistics)
  country: Country;
}
