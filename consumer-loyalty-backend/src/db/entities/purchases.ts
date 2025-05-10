import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { Metadata } from './metadata';
import { Customer } from './customers';
import { Product } from './products';
import { Retailer } from './retailers';
import { Promotion } from './promotions';

@Entity('purchases')
export class Purchase extends Metadata {
  /** Quantity of product purchased */
  @Column('int', { default: 0, comment: 'count of items purchased' })
  quantity: number;

  /** Per-unit sale price in cents */
  @Column('int', {
    name: snakeCase('salePrice'),
    comment: 'snapshot of product sale_price at purchase time',
  })
  salePrice: number;

  /** Total = quantity * sale_price */
  @Column('int', {
    name: snakeCase('totalPrice'),
    comment: 'calculated total price at purchase time: sale_price * quantity',
  })
  totalPrice: number;

  /** Award rate used at time of purchase */
  @Column('int', {
    default: 0,
    name: snakeCase('awardRate'),
    comment: 'snapshot of award_rate at purchase time',
  })
  awardRate: number;

  /** Points earned for this purchase */
  @Column('int', {
    default: 0,
    name: snakeCase('pointsEarned'),
    comment: 'snapshot of points_earned at purchase time',
  })
  pointsEarned: number;

  /** Foreign key to customer */
  @Column('uuid', { name: snakeCase('customerId') })
  customerId: string;

  /** Many-to-one relationship with Customer - many purchases can belong to one customer */
  @ManyToOne(() => Customer, (customer) => customer.purchases)
  @JoinColumn({
    name: snakeCase('customerId'),
    foreignKeyConstraintName: 'fk_purchases_customerId',
  })
  customer: Customer;

  /** Foreign key to product */
  @Column('uuid', { name: snakeCase('productId') })
  productId: string;

  /** Many-to-one relationship with Product - many purchases can be for one product */
  @ManyToOne(() => Product, (product) => product.purchases)
  @JoinColumn({
    name: snakeCase('productId'),
    foreignKeyConstraintName: 'fk_purchases_productId',
  })
  product: Product;

  /** Foreign key to retailer */
  @Column('uuid', { name: snakeCase('retailerId') })
  retailerId: string;

  /** Many-to-one relationship with Retailer - many purchases can be of one retailer */
  @ManyToOne(() => Retailer, (retailer) => retailer.purchases)
  @JoinColumn({
    name: snakeCase('retailerId'),
    foreignKeyConstraintName: 'fk_purchases_retailerId',
  })
  retailer: Retailer;

  /** Foreign key to promotion (optional) */
  @Column('uuid', { name: snakeCase('promotionId'), nullable: true })
  promotionId: string | null;

  /** Many-to-one relationship with Promotion - many purchases can use one promotion */
  @ManyToOne(() => Promotion, (promotion) => promotion.purchases, {
    nullable: true,
  })
  @JoinColumn({
    name: snakeCase('promotionId'),
    foreignKeyConstraintName: 'fk_purchases_promotionId',
  })
  promotion: Promotion | null;
}
