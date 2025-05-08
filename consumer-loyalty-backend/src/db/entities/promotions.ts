import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { Metadata } from './metadata';
import { Product } from './products';

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
    foreignKeyConstraintName: 'fk_promotions_product_id',
  })
  product: Product;
}
