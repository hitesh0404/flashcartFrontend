import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import { getProductsApi } from "../../api";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await getProductsApi();
        // EXPECTED: res.data is an array of Product DTOs
        if (isMounted) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to load products.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section>
        <h1>Products</h1>
        <p>Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1>Products</h1>
        <p style={{ color: "red" }}>{error}</p>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section>
        <h1>Products</h1>
        <p>No products found.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
