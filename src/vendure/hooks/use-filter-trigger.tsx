import { createContext, useContext, ReactNode } from 'react';

type FilterTriggerContextType = {
  setTrigger: (trigger: ReactNode) => void;
};

export const FilterTriggerContext = createContext<FilterTriggerContextType | null>(null);

export const useFilterTrigger = () => {
  const context = useContext(FilterTriggerContext);
  if (!context) {
    throw new Error('useFilterTrigger must be used within a FilterTriggerProvider');
  }
  return context;
};