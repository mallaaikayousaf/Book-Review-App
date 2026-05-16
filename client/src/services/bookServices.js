import api from './api';

export const getBooks = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/books${params ? `?${params}` : ''}`);
  return response.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const searchBooks = async (query) => {
  const response = await api.get(`/books/search?q=${query}`);
  return response.data;
};

export const getBooksByGenre = async (genre) => {
  const response = await api.get(`/books/genre/${genre}`);
  return response.data;
};