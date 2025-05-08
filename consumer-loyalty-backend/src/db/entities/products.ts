import { Column, Entity, Index } from 'typeorm';
import { Metadata } from './metadata';
import { snakeCase } from 'typeorm/util/StringUtils';

const name = 'name';

@Entity('products')
// column name here needs to match the typeorm column casing convention, not the actual db column casing
@Index(snakeCase('idxProductsName'), [name], {
  unique: true,
})
export class Product extends Metadata {
  @Column('varchar')
  [name]: string;

  @Column('int', { comment: 'price in cents, not dollars' })
  price: number;
}
