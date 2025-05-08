import { Column, Entity } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { Metadata } from './metadata';

@Entity('promotions')
export class Promotion extends Metadata {
  @Column('date', {
    name: snakeCase('startDate'),
    comment: 'format yyyy-mm-dd',
  })
  startDate: Date;

  @Column('date', { name: snakeCase('endDate'), comment: 'format yyyy-mm-dd' })
  endDate: Date;

  @Column('int', {
    name: snakeCase('awardRate'),
    default: 0,
    comment:
      'points per dollar multiplier. 100 means 100 points per dollar spent',
  })
  awardRate: number;

  @Column('int', { comment: 'version counter; highest is most recent' })
  version: number;
}
