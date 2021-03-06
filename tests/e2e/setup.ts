import { destroyDBConnection, migrateDB, truncateDB } from '../utils';


beforeAll(async () => {
  await migrateDB();
  await truncateDB();
});

afterAll(async () => {
  await truncateDB();
  await destroyDBConnection();
});
