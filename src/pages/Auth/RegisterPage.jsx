import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
      // On success, go to login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="First Name"
          name="fname"
          value={form.fname}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name"
          name="lname"
          value={form.lname}
          onChange={handleChange}
          required
        />
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
          {submitting ? "Creating account..." : "Register"}
        </Button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
