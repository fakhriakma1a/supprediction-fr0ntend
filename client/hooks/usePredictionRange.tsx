import { createContext, useContext, useState, ReactNode } from 'react';

export type PredictionRange = 'daily' | 'weekly' | 'monthly';

interface PredictionRangeContextType {
  range: PredictionRange;
  setRange: (range: PredictionRange) => void;
  rangeLabel: string;
}

const PredictionRangeContext = createContext<PredictionRangeContextType | undefined>(undefined);

export function PredictionRangeProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<PredictionRange>('daily');
  
  const getRangeLabel = (range: PredictionRange): string => {
    switch (range) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      default:
        return 'Daily';
    }
  };

  const value = {
    range,
    setRange,
    rangeLabel: getRangeLabel(range),
  };

  return (
    <PredictionRangeContext.Provider value={value}>
      {children}
    </PredictionRangeContext.Provider>
  );
}

export function usePredictionRange() {
  const context = useContext(PredictionRangeContext);
  if (context === undefined) {
    throw new Error('usePredictionRange must be used within a PredictionRangeProvider');
  }
  return context;
}