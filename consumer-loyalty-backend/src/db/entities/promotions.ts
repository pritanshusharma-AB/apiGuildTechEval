import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { MetadataEntity } from '../metadata.entity';
import { Product } from './products';
import { PurchaseEntity } from '../../modules/purchases/entity';
import { Retailer } from './retailers';

@Entity('promotions')
@Index(
  snakeCase('idxLatestPromotions'),
  ['productId', 'retailerId', 'startDate', 'endDate', 'version'],
  { unique: true },
)
export class Promotion extends MetadataEntity {
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

  @Column('int', {
    comment: 'version counter; highest is most recent',
    default: 0,
  })
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
  @OneToMany(() => PurchaseEntity, (purchase) => purchase.promotion)
  purchases: PurchaseEntity[];

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
