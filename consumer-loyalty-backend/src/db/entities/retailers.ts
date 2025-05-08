import { Column, Entity, Index } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { Metadata } from './metadata';

const authToken = 'authToken';

@Entity('retailers')
// column name here needs to match the typeorm column casing convention, not the actual db column casing
@Index(snakeCase('idxRetailersAuthToken'), [authToken], {
  unique: true,
})
export class Retailer extends Metadata {
  @Column('varchar')
  name: string;

  /** Auth token used to validate retailer */
  @Column('varchar', { name: snakeCase(authToken) })
  [authToken]: string;
}
