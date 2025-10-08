import { AbstractPowerSyncDatabase, CrudEntry, PowerSyncBackendConnector } from '@powersync/web';

export class MongoDBConnector implements PowerSyncBackendConnector {
  private apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  async fetchCredentials() {
    const authToken = localStorage.getItem('auth_token');
    
    if (!authToken) {
      // For demo purposes, create a demo token
      const demoToken = 'demo_user_token';
      localStorage.setItem('auth_token', demoToken);
    }

    return {
      endpoint: import.meta.env.VITE_POWERSYNC_URL,
      token: authToken || 'demo_user_token',
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    };
  }

  async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
    const transaction = await database.getNextCrudTransaction();
    
    if (!transaction) return;

    try {
      const authToken = localStorage.getItem('auth_token');
      
      for (const operation of transaction.crud) {
        await this.processOperation(operation, authToken!);
      }

      await transaction.complete();
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  private async processOperation(op: CrudEntry, authToken: string) {
    const { table, op: operation, opData } = op;
    const endpoint = `${this.apiUrl}/${table}`;
    
    console.log(`Syncing to MongoDB: ${operation} ${table}`, opData);
    
    switch (operation) {
      case 'PUT':
      case 'PATCH':
        await fetch(`${endpoint}/${opData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(this.transformToMongo(table, opData)),
        });
        break;

      case 'DELETE':
        await fetch(`${endpoint}/${opData.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        break;
    }
  }

  private transformToMongo(table: string, data: any) {
    const transformed = { ...data };
    
    if (table === 'products' && transformed.images) {
      if (typeof transformed.images === 'string') {
        try {
          transformed.images = JSON.parse(transformed.images);
        } catch (e) {
          transformed.images = [];
        }
      }
      transformed.is_new = Boolean(transformed.is_new);
    }
    
    delete transformed.id;
    return transformed;
  }
}
