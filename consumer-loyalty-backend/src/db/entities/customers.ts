import { Column, Entity, OneToMany } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { MetadataEntity } from '../metadata.entity';
import { PurchaseEntity } from '../../modules/purchases/entity';

@Entity('customers')
export class Customer extends MetadataEntity {
  @Column('varchar', { name: snakeCase('firstName') })
  firstName: string;

  @Column('varchar', { name: snakeCase('lastName') })
  lastName: string;

  /** Current loyalty point balance */
  @Column('int', { default: 0, name: snakeCase('pointBalance') })
  pointBalance: number;

  /** One-to-many relationship with Purchase - one customer can have many purchases */
  @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
  purchases: PurchaseEntity[];
}
