import { useEffect, useState } from "react";
import { getOrdersApi } from "../../api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrdersApi();
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to load orders", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <section>
        <h1>Your Orders</h1>
        <p>Loading orders...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1>Your Orders</h1>
        <p style={{ color: "red" }}>{error}</p>
      </section>
    );
  }

  if (!orders.length) {
    return (
      <section>
        <h1>Your Orders</h1>
        <p>You have no orders yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Orders</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {orders.map((order) => (
          <li
            key={order.orderId}
            style={{
              borderBottom: "1px solid #e5e7eb",
              padding: "0.5rem 0",
            }}
          >
            <div>
              <strong>Order #{order.orderId}</strong> – Status: {order.status}
            </div>
            <div>Amount: ₹{order.amount}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
