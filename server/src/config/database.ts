import { DataSource } from 'typeorm';

class DatabaseManager {
  private static instance: DatabaseManager;
  private _dataSource: DataSource;

  private constructor() {
    this._dataSource = new DataSource({
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
  }

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  initialize(): Promise<void> {
    return this._dataSource
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization:', err);
      });
  }

  getDataSource(): DataSource {
    return this._dataSource;
  }
}

export const dbManager = DatabaseManager.getInstance();
