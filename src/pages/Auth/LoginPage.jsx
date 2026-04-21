import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload[web:61][web:63][web:71]
    setError("");
    setSubmitting(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      // adjust based on your backend error shape
      setError("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && (
          <p style={{ color: "red", marginBottom: "0.5rem" }}>{error}</p>
        )}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
}
