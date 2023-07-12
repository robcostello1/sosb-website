import { useEffect } from 'react';

export const useLogState = (stateItem: any, label?: string) => {
  useEffect(() => {
    if (label) {
      console.log(label, stateItem);
    } else {
      console.log(stateItem);
    }
  }, [stateItem, label]);
};

export const useLog = useLogState;
