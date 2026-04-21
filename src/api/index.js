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
