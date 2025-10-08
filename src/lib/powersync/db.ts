import { PowerSyncDatabase } from '@powersync/web';
import { AppSchema } from './schema';
import { MongoDBConnector } from './connector';

export const powerSync = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: 'furniture-store.db',
  },
});

export const connector = new MongoDBConnector();

export async function initPowerSync() {
  await powerSync.init();
  await powerSync.connect(connector);
  console.log('✅ PowerSync connected');
}