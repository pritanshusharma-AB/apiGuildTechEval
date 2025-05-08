import { Column, Entity, Index } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { Metadata } from './metadata';

const transactionId = 'transactionId';

@Entity('purchases')
@Index(snakeCase('idxPurchasesTransactionId'), [transactionId], {
  unique: true,
})
export class Purchase extends Metadata {
  /** Unique random-string external ID */
  @Column('varchar', { name: snakeCase(transactionId) })
  [transactionId]: string;

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
}
