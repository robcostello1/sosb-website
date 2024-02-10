import { create } from 'zustand';

export const NUM_TEXTURES = 31;

export const useLoadingStore = create<{
  items: number;
  reset: () => void;
  removeItem: () => void;
  removeItems: (num: number) => void;
}>((set) => ({
  items: NUM_TEXTURES,
  reset: () => set({ items: NUM_TEXTURES }),
  removeItem: () => set((state) => ({ items: state.items - 1 })),
  removeItems: (num) => set((state) => ({ items: state.items - num })),
}));
