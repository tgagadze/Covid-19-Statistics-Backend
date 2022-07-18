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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ type: 'jsonb' })
  name: NameProperties;

  @OneToMany(() => Statistics, (statistics) => statistics.country, {
    onDelete: 'CASCADE',
  })
  statistics: Statistics[];

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
}
