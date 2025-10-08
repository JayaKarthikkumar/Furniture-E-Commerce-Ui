import React, { useEffect, useState } from 'react';
import { PowerSyncContext } from '@powersync/react';
import { powerSync, initPowerSync } from '../lib/powersync/db';

export const PowerSyncProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initPowerSync()
      .then(() => {
        setReady(true);
        console.log('PowerSync ready');
      })
      .catch((err) => {
        console.error('PowerSync init failed:', err);
        setError(err.message);
      });

    return () => {
      powerSync.disconnectAndClear();
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 font-semibold mb-2">Connection Error</p>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#B88E2F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to database...</p>
        </div>
      </div>
    );
  }

  return (
    <PowerSyncContext.Provider value={powerSync}>
      {children}
    </PowerSyncContext.Provider>
  );
};