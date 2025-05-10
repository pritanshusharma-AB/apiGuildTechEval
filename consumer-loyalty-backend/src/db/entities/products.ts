import { Column, Entity, Index, OneToMany } from 'typeorm';
import { MetadataEntity } from '../metadata.entity';
import { snakeCase } from 'typeorm/util/StringUtils';
import { Promotion } from './promotions';
import { PurchaseEntity } from '../../modules/purchases/entity';

const name = 'name';

@Entity('products')
// column name here needs to match the typeorm column casing convention, not the actual db column casing
@Index(snakeCase('idxProductsName'), [name], {
  unique: true,
})
export class Product extends MetadataEntity {
  @Column('varchar')
  [name]: string;

  @Column('int', { comment: 'price in cents, not dollars' })
  price: number;

  /** One-to-many relationship with Promotion, same product can have many promotions */
  @OneToMany(() => Promotion, (promotion) => promotion.product)
  promotions: Promotion[];

  /** One-to-many relationship with Product - one product can be in many purchases */
  @OneToMany(() => PurchaseEntity, (purchase) => purchase.product)
  purchases: PurchaseEntity[];
}
