import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { CustomerEntity } from '../../modules/customers/entity';

export default class CustomerSeeder implements Seeder {
  readonly name = CustomerSeeder.name;

  public async run(dataSource: DataSource): Promise<void> {
    console.log('Seeding Starting ==>', this.name);

    const repository = dataSource.getRepository(CustomerEntity);

    const count = 10;

    const items = Array(count)
      .fill(null)
      .map(() => {
        const item = new CustomerEntity();
        item.firstName = faker.person.firstName();
        item.lastName = faker.person.lastName();
        return item;
      });

    const result = await repository.save(items);

    console.log('Seeding Complete ==>', this.name, {
      itemCount: result.length,
    });
  }
}
