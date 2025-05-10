import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';

// Load .env file
dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
  console.error(
    'Missing required environment variables: DB_NAME, DB_USER, DB_PASSWORD',
  );
  process.exit(1);
}

// Configuration for TypeORM CLI, migrations, and seeds
export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  entities: [
    'dist/db/entities/*.{ts,js}',
    'dist/modules/**/entity.{ts,js}',
    'dist/db/**.entity.{ts,js}',
  ],
  migrations: ['dist/db/migrations/*.{ts,js}'],
  seeds: ['dist/db/seeds/*.{ts,js}'],
  synchronize: false,
  logging: false,
};

// Create and export a DataSource instance
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
