import { useContext } from 'react';
import { ReadingListContext } from '../context/ReadingListContext';

export const useReadingList = () => {
  const context = useContext(ReadingListContext);
  if (!context) {
    throw new Error('useReadingList must be used within ReadingListProvider');
  }
  return context;
};