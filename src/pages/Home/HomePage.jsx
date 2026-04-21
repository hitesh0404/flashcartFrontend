// src/pages/Home/HomePage.jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section>
      <h1>Welcome to MyStore</h1>
      <p>Browse our products.</p>
      <Link to="/products">Go to products</Link>
    </section>
  );
}
