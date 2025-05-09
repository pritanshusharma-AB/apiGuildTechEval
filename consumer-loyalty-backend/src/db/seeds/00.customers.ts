import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Customer } from '../entities/customers';

export default class CustomerSeeder implements Seeder {
  readonly name = CustomerSeeder.name;

  public async run(dataSource: DataSource): Promise<void> {
    console.log('Seeding Starting ==>', this.name);

    const repository = dataSource.getRepository(Customer);

    const count = 10;

    const customers = Array(count)
      .fill(null)
      .map(() => {
        const customer = new Customer();
        customer.firstName = faker.person.firstName();
        customer.lastName = faker.person.lastName();
        return customer;
      });

    const result = await repository.save(customers);

    console.log('Seeding Complete ==>', this.name, {
      customerCount: result.length,
    });
  }
}
