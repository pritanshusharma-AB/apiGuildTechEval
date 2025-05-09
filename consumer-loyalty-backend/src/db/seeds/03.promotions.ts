import { faker } from '@faker-js/faker';
import { addDays, subDays } from 'date-fns';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Product } from '../entities/products';
import { Promotion } from '../entities/promotions';
import { Retailer } from '../entities/retailers';

// map out which product by index gets which promotion handler
const productUseCaseMap: Record<
  number,
  (product?: Product, retailers?: Retailer[]) => Promotion[]
> = {
  0: () => [],
  1: allCurrent, // 10 promotions expected
  2: allCurrent, // 10 promotions expected
  3: first5Current, // 5 promotions expected
  4: first5Current, // 5 promotions expected
  5: allExpired, // 10 promotions expected
  6: allExpired, // 10 promotions expected
  7: last5Upcoming, // 5 promotions expected
  8: last5Upcoming, // 5 promotions expected
  9: halfTerminatedHalfBoosted, // 20 promotions expected
};

function buildBase(product: Product, retailer: Retailer): Promotion {
  const startDate = faker.date.recent({ days: 60 });
  return {
    ...new Promotion(),
    retailerId: retailer.id,
    productId: product.id,
    awardRate: faker.helpers.arrayElement([100, 200, 400, 800]),
    startDate,
    endDate: addDays(startDate, 180),
    createdAt: subDays(startDate, 10),
  };
}

// product gets a current promotion at all retailers
function allCurrent(product: Product, retailers: Retailer[]): Promotion[] {
  return retailers.map((retailer) => buildBase(product, retailer));
}

// product gets a current promotion at first 5 retailers
function first5Current(product: Product, retailers: Retailer[]): Promotion[] {
  return retailers.slice(0, 5).map((retailer) => buildBase(product, retailer));
}

// product gets a upcoming promotion at last 5 retailers
function last5Upcoming(product: Product, retailers: Retailer[]): Promotion[] {
  return retailers.slice(5, 10).map((retailer) => {
    const startDate = faker.date.soon({ days: 30 });
    return {
      ...buildBase(product, retailer),
      startDate,
      endDate: addDays(startDate, 180),
      createdAt: subDays(startDate, 10),
    };
  });
}

// product gets a expired promotion at all retailers
function allExpired(product: Product, retailers: Retailer[]): Promotion[] {
  return retailers.map((retailer) => {
    const endDate = faker.date.recent({ days: 60 });
    return {
      ...buildBase(product, retailer),
      endDate,
      startDate: subDays(endDate, 180),
      createdAt: subDays(endDate, 190),
    };
  });
}

// product gets a promotion at all retailers, but some are terminated and some are boosted within the last 15 days
function halfTerminatedHalfBoosted(
  product: Product,
  retailers: Retailer[],
): Promotion[] {
  const startDate = subDays(new Date(), 100);

  // Create initial promotions: started 100 days ago, ending in 80 days
  const initial = retailers.map((retailer) => ({
    ...buildBase(product, retailer),
    startDate,
    createdAt: subDays(startDate, 10),
    endDate: addDays(startDate, 180),
    awardRate: 100,
    version: 0,
  }));

  const half = Math.floor(initial.length / 2);
  const effectiveChangeDate = subDays(startDate, 15); // 15 days ago

  // First half: terminated
  const terminated = initial.slice(0, half).map((promotion) => ({
    ...promotion,
    endDate: effectiveChangeDate,
    updatedAt: effectiveChangeDate,
    version: 1,
  }));

  // Second half: boosted award rate, keep endDate unchanged
  const boosted = initial.slice(half).map((promotion) => ({
    ...promotion,
    awardRate: 300,
    updatedAt: effectiveChangeDate,
    version: 1,
  }));

  return [...initial, ...terminated, ...boosted];
}

export default class PromotionSeeder implements Seeder {
  readonly name = PromotionSeeder.name;

  public async run(dataSource: DataSource): Promise<void> {
    console.log('Seeding Starting ==>', this.name);

    const repository = dataSource.getRepository(Promotion);
    const productsRepo = dataSource.getRepository(Product);
    const retailersRepo = dataSource.getRepository(Retailer);

    const [products, retailers] = await Promise.all([
      productsRepo.find({ order: { name: 'ASC' } }),
      retailersRepo.find({ order: { name: 'ASC' } }),
    ]);

    const items = products.reduce((acc: Promotion[], cur, ind) => {
      const temp = productUseCaseMap[ind](cur, retailers);
      return [...acc, ...temp];
    }, []);

    const result = await repository.save(items);

    console.log('Seeding Complete ==>', this.name, {
      itemCount: result.length,
    });
  }
}
