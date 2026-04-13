import api from './api';

const authConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchProductsApi = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const fetchProductByIdApi = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProductApi = async ({ token, product }) => {
  const { data } = await api.post('/products', product, authConfig(token));
  return data;
};

export const updateProductApi = async ({ token, id, product }) => {
  const { data } = await api.put(`/products/${id}`, product, authConfig(token));
  return data;
};

export const deleteProductApi = async ({ token, id }) => {
  const { data } = await api.delete(`/products/${id}`, authConfig(token));
  return data;
};
