import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getCartApi,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
} from "../api";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

 const loadCart = useCallback(async () => {
   if (!isAuthenticated) {
     setItems([]);
     return;
   }
   setLoading(true);
   try {
     const res = await getCartApi();
     setItems(res.data || []);
   } catch (err) {
     console.error("Failed to load cart", err);
     setItems([]); // make sure array, not stale data
   } finally {
     setLoading(false);
   }
 }, [isAuthenticated]);
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      alert("Please login to add items to your cart.");
      return;
    }
    try {
      await addToCartApi(product.id, quantity);
      await loadCart();
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const updateItem = async (cartId, quantity) => {
    try {
      await updateCartItemApi(cartId, quantity);
      await loadCart();
    } catch (err) {
      console.error("Failed to update cart item", err);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await removeCartItemApi(cartId);
      await loadCart();
    } catch (err) {
      console.error("Failed to remove cart item", err);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartApi();
      setItems([]);
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const cartTotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price = item?.product?.price ?? 0;
        const qty = item?.quantity ?? 0;
        return sum + price * qty;
      }, 0),
    [items],
  );

  const value = {
    items,
    loading,
    cartCount,
    cartTotal,
    addToCart,
    updateItem,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
