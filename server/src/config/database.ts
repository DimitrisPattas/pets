import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'root',
  database: 'pet_db',
  entities: ['src/entity/*.ts'],
  logging: false,
  synchronize: true,
});
