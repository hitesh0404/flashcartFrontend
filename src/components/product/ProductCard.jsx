// src/components/product/ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="product-card">
      <h3>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h3>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product, 1)}>Add to cart</button>
    </div>
  );
}
