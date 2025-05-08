import { Column, Entity } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { Metadata } from './metadata';

@Entity('customers')
export class Customer extends Metadata {
  @Column('varchar', { name: snakeCase('firstName') })
  firstName: string;

  @Column('varchar', { name: snakeCase('lastName') })
  lastName: string;

  /** Current loyalty point balance */
  @Column('int', { default: 0, name: snakeCase('pointBalance') })
  pointBalance: number;
}
