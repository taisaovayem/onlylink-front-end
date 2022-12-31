import authStore, { AuthStore } from '@/shared/auth/stores/auth.store';
import * as React from 'react';
import { useLocalObservable } from 'mobx-react-lite';

type RootStore = {
  authStore: AuthStore;
};

const rootStore: RootStore = {
  authStore,
};

const StoreContext = React.createContext<RootStore | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = useLocalObservable(() => rootStore);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
