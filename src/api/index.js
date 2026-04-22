import api from "./client";

// AUTH
export const loginApi = (payload) => api.post("/auth/login", payload);
export const registerApi = (payload) => api.post("/auth/register", payload);
export const getCurrentUserApi = () => api.get("/auth/me");

// PRODUCTS
export const getProductsApi = (params) => api.get("/products", { params });

export const getProductByIdApi = (id) => api.get(`/products/${id}`);

// CART (backend-driven, per logged-in user)

// GET /api/cart
export const getCartApi = () => api.get("/cart");

// POST /api/cart?productId=&quantity=
export const addToCartApi = (productId, quantity = 1) =>
  api.post(
    "/cart",
    {},
    {
      params: { productId, quantity },
    },
  );

// PUT /api/cart/{cartId}?quantity=
export const updateCartItemApi = (cartId, quantity) =>
  api.put(
    `/cart/${cartId}`,
    {},
    {
      params: { quantity },
    },
  );

// DELETE /api/cart/{cartId}
export const removeCartItemApi = (cartId) => api.delete(`/cart/${cartId}`);

// DELETE /api/cart
export const clearCartApi = () => api.delete("/cart");

// GET /api/addresses
export const getAddressesApi = () => api.get("/addresses");

// POST /api/addresses
export const createAddressApi = (payload) => api.post("/addresses", payload);

// PUT /api/addresses/{id}
export const updateAddressApi = (id, payload) =>
  api.put(`/addresses/${id}`, payload);

// DELETE /api/addresses/{id}
export const deleteAddressApi = (id) => api.delete(`/addresses/${id}`);

/** ORDERS */

// POST /api/orders?addressId=
export const createOrderApi = (addressId) =>
  api.post(
    "/orders",
    {},
    {
      params: { addressId },
    },
  );

// GET /api/orders
export const getOrdersApi = () => api.get("/orders");

// GET /api/orders/{orderId}
export const getOrderByIdApi = (orderId) => api.get(`/orders/${orderId}`);
