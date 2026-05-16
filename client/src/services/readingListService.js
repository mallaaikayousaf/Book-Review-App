import api from './api';

export const getReadingList = async () => {
  const response = await api.get('/reading-list');
  return response.data;
};

export const addToReadingList = async (bookId, status = 'want-to-read') => {
  const response = await api.post('/reading-list', { bookId, status });
  return response.data;
};

export const removeFromReadingList = async (bookId) => {
  const response = await api.delete(`/reading-list/${bookId}`);
  return response.data;
};

export const updateBookStatus = async (bookId, status) => {
  const response = await api.put(`/reading-list/${bookId}`, { status });
  return response.data;
};