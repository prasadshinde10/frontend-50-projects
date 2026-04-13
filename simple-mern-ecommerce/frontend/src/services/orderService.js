import api from './api';

const authConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const createOrderApi = async ({ token, order }) => {
  const { data } = await api.post('/orders', order, authConfig(token));
  return data;
};

export const getMyOrdersApi = async (token) => {
  const { data } = await api.get('/orders/my', authConfig(token));
  return data;
};

export const getAllOrdersApi = async (token) => {
  const { data } = await api.get('/admin/orders', authConfig(token));
  return data;
};

export const getUsersApi = async (token) => {
  const { data } = await api.get('/admin/users', authConfig(token));
  return data;
};
