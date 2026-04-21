import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdApi } from "../../api";
import { useCart } from "../../hooks/useCart";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const res = await getProductByIdApi(id);
        if (isMounted) {
          setProduct(res.data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to load product.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <section>
        <h1>Product Detail</h1>
        <p>Loading...</p>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section>
        <h1>Product Detail</h1>
        <p style={{ color: "red" }}>{error || "Product not found."}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>{product.name}</h1>
      <p>₹{product.price}</p>

      {/* You can show brand, categories, description here once they exist in your DTO */}

      <button onClick={() => addToCart(product, 1)}>Add to cart</button>
    </section>
  );
}
