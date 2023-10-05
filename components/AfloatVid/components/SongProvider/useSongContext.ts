import { useContext } from 'react';

import { SongContext } from './context';

export const useSongContext = () => {
  return useContext(SongContext);
};
