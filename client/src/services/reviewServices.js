import api from './api';

export const getBookReviews = async (bookId) => {
  const response = await api.get(`/reviews/book/${bookId}`);
  return response.data;
};

export const createReview = async (bookId, rating, comment) => {
  const response = await api.post('/reviews', { bookId, rating, comment });
  return response.data;
};

export const updateReview = async (reviewId, rating, comment) => {
  const response = await api.put(`/reviews/${reviewId}`, { rating, comment });
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};

export const getUserReviews = async () => {
  const response = await api.get('/reviews/my-reviews');
  return response.data;
};