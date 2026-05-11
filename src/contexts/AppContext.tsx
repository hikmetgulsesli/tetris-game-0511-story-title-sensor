import { createContext, useContext, type ReactNode } from 'react';
import { useAppState, type UseAppStateReturn } from '../hooks/useAppState';

const AppContext = createContext<UseAppStateReturn | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const value = useAppState();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): UseAppStateReturn {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return ctx;
}
