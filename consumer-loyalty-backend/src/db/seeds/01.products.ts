import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Product } from '../entities/products';

export default class ProductSeeder implements Seeder {
  readonly name = ProductSeeder.name;

  public async run(dataSource: DataSource): Promise<void> {
    console.log('Seeding Starting ==>', this.name);

    const repository = dataSource.getRepository(Product);

    const count = 10;

    const items = Array(count)
      .fill(null)
      .map(() => {
        const item = new Product();
        item.name = faker.commerce.productName();
        item.price = faker.number.int({ min: 100, max: 10000 });
        return item;
      });

    const result = await repository.save(items);

    console.log('Seeding Complete ==>', this.name, {
      itemCount: result.length,
    });
  }
}
