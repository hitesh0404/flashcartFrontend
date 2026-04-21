// src/pages/Cart/CartPage.jsx
import { useCart } from "../../hooks/useCart";
import CartItem from "../../components/cart/CartItem";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { items, cartTotal, loading } = useCart();

  if (loading) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p>Loading cart...</p>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Go to products</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <h3>Total: ₹{cartTotal}</h3>
      <Link to="/checkout">Proceed to Checkout</Link>
    </section>
  );
}
