import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { Metadata } from './metadata';
import { Product } from './products';
import { Purchase } from './purchases';
import { Retailer } from './retailers';

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

  /** Foreign key to product */
  @Column('uuid', { name: snakeCase('productId') })
  productId: string;

  // Many-to-one relationship with Product, many promotions can have the same product */
  @ManyToOne(() => Product, (product) => product.promotions)
  @JoinColumn({
    name: snakeCase('productId'),
    foreignKeyConstraintName: 'fk_promotions_productId',
  })
  product: Product;

  /** One-to-many relationship with Purchase - one promotion can apply to many purchases */
  @OneToMany(() => Purchase, (purchase) => purchase.promotion)
  purchases: Purchase[];

  /** Foreign key to retailer (optional) */
  @Column('uuid', { name: snakeCase('retailerId') })
  retailerId: string;

  /** Many-to-one relationship with Retailer - many promotions can belong to one retailer */
  @ManyToOne(() => Retailer, (retailer) => retailer.promotions)
  @JoinColumn({
    name: snakeCase('retailerId'),
    foreignKeyConstraintName: 'fk_promotions_retailerId',
  })
  retailer: Retailer;
}
