import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Metadata } from './metadata';
import { snakeCase } from 'typeorm/util/StringUtils';
import { Promotion } from './promotions';
import { Purchase } from './purchases';

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

  /** One-to-many relationship with Promotion, same product can have many promotions */
  @OneToMany(() => Promotion, (promotion) => promotion.product)
  promotions: Promotion[];

  /** One-to-many relationship with Product - one product can be in many purchases */
  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases: Purchase[];
}
