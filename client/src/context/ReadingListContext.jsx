import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getReadingList, addToReadingList, removeFromReadingList, updateBookStatus } from '../services/readingListService';

const ReadingListContext = createContext();

export const useReadingList = () => {
  const context = useContext(ReadingListContext);
  if (!context) {
    throw new Error('useReadingList must be used within ReadingListProvider');
  }
  return context;
};

export const ReadingListProvider = ({ children }) => {
  const [readingList, setReadingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchReadingList();
    } else {
      setReadingList([]);
    }
  }, [user]);

  const fetchReadingList = async () => {
    setLoading(true);
    try {
      const data = await getReadingList();
      setReadingList(data);
    } catch (error) {
      console.error('Error fetching reading list:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToList = async (bookId, status = 'want-to-read') => {
    try {
      await addToReadingList(bookId, status);
      await fetchReadingList();
    } catch (error) {
      console.error('Error adding to reading list:', error);
      throw error;
    }
  };

  const removeFromList = async (bookId) => {
    try {
      await removeFromReadingList(bookId);
      await fetchReadingList();
    } catch (error) {
      console.error('Error removing from reading list:', error);
      throw error;
    }
  };

  const updateStatus = async (bookId, status) => {
    try {
      await updateBookStatus(bookId, status);
      await fetchReadingList();
    } catch (error) {
      console.error('Error updating book status:', error);
      throw error;
    }
  };

  const isInList = (bookId) => {
    return readingList.some(item => item.book._id === bookId);
  };

  const getBookStatus = (bookId) => {
    const item = readingList.find(item => item.book._id === bookId);
    return item ? item.status : null;
  };

  const value = {
    readingList,
    loading,
    addToReadingList: addToList,
    removeFromReadingList: removeFromList,
    updateBookStatus: updateStatus,
    isInReadingList: isInList,
    getBookStatus,
    refreshReadingList: fetchReadingList,
  };

  return <ReadingListContext.Provider value={value}>{children}</ReadingListContext.Provider>;
};