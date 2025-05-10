import { Query, Resolver } from '@nestjs/graphql';
import { CustomerObject } from './object';
import { CustomerService } from './service';

@Resolver(() => CustomerObject)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [CustomerObject], { name: 'findAllCustomers' })
  findAll() {
    return this.customerService.findAll();
  }
}
