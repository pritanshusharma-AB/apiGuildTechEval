import { Column, Entity, Index, OneToMany } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { MetadataEntity } from '../metadata.entity';
import { PurchaseEntity } from '../../modules/purchases/entity';
import { Promotion } from './promotions';

const authToken = 'authToken';

@Entity('retailers')
// column name here needs to match the typeorm column casing convention, not the actual db column casing
@Index(snakeCase('idxRetailersAuthToken'), [authToken], {
  unique: true,
})
export class Retailer extends MetadataEntity {
  @Column('varchar')
  name: string;

  /** Auth token used to validate retailer */
  @Column('varchar', { name: snakeCase(authToken) })
  [authToken]: string;

  /** One-to-many relationship with Purchase - one retailer can have many purchases */
  @OneToMany(() => PurchaseEntity, (purchase) => purchase.retailer)
  purchases: PurchaseEntity[];

  /** One-to-many relationship with Promotion - one retailer can have many promotions */
  @OneToMany(() => Promotion, (promotion) => promotion.retailer)
  promotions: Promotion[];
}
