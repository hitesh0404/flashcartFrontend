// src/components/cart/CartItem.jsx
import { useCart } from "../../hooks/useCart";

export default function CartItem({ item }) {
  const { updateItem, removeFromCart } = useCart();

  if (!item) return null;

  const handleIncrease = () => {
    updateItem(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateItem(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <div>
        <h4>{item.product.name}</h4>
        <p>
          Qty: {item.quantity} | Price: ₹{item.product.price}
        </p>
      </div>
      <div>
        <button onClick={handleDecrease} disabled={item.quantity <= 1}>
          -
        </button>
        <button onClick={handleIncrease}>+</button>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
}
