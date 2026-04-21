import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <Link to="/" className="navbar-logo">
          MyStore
        </Link>

        <div className="navbar-links">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          {user && <NavLink to="/orders">Orders</NavLink>}
        </div>

        <div className="navbar-auth">
          {user ? (
            <>
              <span>Hello, {user.fname || user.email}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
