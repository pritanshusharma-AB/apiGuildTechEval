import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Retailer } from '../entities/retailers';

export default class RetailerSeeder implements Seeder {
  readonly name = RetailerSeeder.name;

  public async run(dataSource: DataSource): Promise<void> {
    console.log('Seeding Starting ==>', this.name);

    const repository = dataSource.getRepository(Retailer);

    const count = 10;

    const items = Array(count)
      .fill(null)
      .map(() => {
        const item = new Retailer();
        item.name = faker.commerce.productName();
        item.authToken = faker.string.alphanumeric(10);
        return item;
      });

    const result = await repository.save(items);

    console.log('Seeding Complete ==>', this.name, {
      itemCount: result.length,
    });
  }
}
