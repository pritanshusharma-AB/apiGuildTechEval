import { Query, Resolver } from '@nestjs/graphql';
import { PurchaseObject } from './object';
import { PurchaseService } from './service';

@Resolver(() => PurchaseObject)
export class PurchaseResolver {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Query(() => [PurchaseObject], { name: 'findAllPurchases' })
  findAll() {
    return this.purchaseService.findAll();
  }
}
