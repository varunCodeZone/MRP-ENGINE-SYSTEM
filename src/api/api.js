import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const getItems = () => API.get('/items');
export const createItem = (data) => API.post('/items', data);
export const updateItem = (id, data) => API.put(`/items/${id}`, data);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export const getBomLinks = () => API.get('/bom');
export const createBomLink = (data) => API.post('/bom', data);
export const deleteBomLink = (id) => API.delete(`/bom/${id}`);

export const runMrp = (productId, quantity) =>
  API.post(`/mrp/explode?productId=${productId}&quantity=${quantity}`);

export const getPurchaseOrders = () => API.get('/mrp/purchase-orders');
export const approvePO = (id) => API.put(`/mrp/purchase-orders/${id}/approve`);
