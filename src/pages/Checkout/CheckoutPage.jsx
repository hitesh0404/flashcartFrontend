import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAddressesApi, createAddressApi, createOrderApi } from "../../api";
import { useCart } from "../../hooks/useCart";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, cartTotal, loading: cartLoading } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addrForm, setAddrForm] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    type: "HOME",
    isDefault: false,
  });
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoadingAddresses(true);
      try {
        const res = await getAddressesApi();
        const list = res.data || [];
        setAddresses(list);
        if (list.length > 0) {
          // choose default address or first one
          const def = list.find((a) => a.default) || list[0];
          setSelectedAddressId(def.id);
        }
      } catch (err) {
        console.error("Failed to load addresses", err);
        setError("Failed to load addresses");
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddrChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddrForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await createAddressApi(addrForm);
      const newAddr = res.data;
      setAddresses((prev) => [...prev, newAddr]);
      setSelectedAddressId(newAddr.id);
      // reset form
      setAddrForm({
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        type: "HOME",
        isDefault: false,
      });
    } catch (err) {
      console.error("Failed to create address", err);
      setError("Failed to save address");
    }
  };

  const handlePlaceOrder = async () => {
    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }
    if (!selectedAddressId) {
      setError("Please select an address.");
      return;
    }

    setError("");
    setPlacingOrder(true);
    try {
      const res = await createOrderApi(selectedAddressId);
      const order = res.data;
      // for now we ignore payment and go directly to orders page
      navigate("/orders");
    } catch (err) {
      console.error("Failed to place order", err);
      setError("Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cartLoading) {
    return (
      <section>
        <h1>Checkout</h1>
        <p>Loading cart...</p>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Checkout</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Order Summary</h2>
      <p>Items: {items.length}</p>
      <p>Total: ₹{cartTotal}</p>

      <h2>Shipping Address</h2>

      {loadingAddresses ? (
        <p>Loading addresses...</p>
      ) : (
        <>
          {addresses.length > 0 ? (
            <div style={{ marginBottom: "1rem" }}>
              {addresses.map((addr) => (
                <label
                  key={addr.id}
                  style={{ display: "block", marginBottom: "0.3rem" }}
                >
                  <input
                    type="radio"
                    name="selectedAddress"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                  />
                  {addr.street}, {addr.city}, {addr.state}, {addr.country} -{" "}
                  {addr.pincode}
                </label>
              ))}
            </div>
          ) : (
            <p>No saved addresses yet.</p>
          )}
        </>
      )}

      <h3>Add New Address</h3>
      <form onSubmit={handleCreateAddress}>
        <div className="form-control">
          <label htmlFor="street">Street</label>
          <input
            id="street"
            name="street"
            value={addrForm.street}
            onChange={handleAddrChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            value={addrForm.city}
            onChange={handleAddrChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            value={addrForm.state}
            onChange={handleAddrChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            value={addrForm.country}
            onChange={handleAddrChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="pincode">Pincode</label>
          <input
            id="pincode"
            name="pincode"
            value={addrForm.pincode}
            onChange={handleAddrChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={addrForm.type}
            onChange={handleAddrChange}
          >
            <option value="HOME">Home</option>
            <option value="OFFICE">Office</option>
          </select>
        </div>
        <div className="form-control">
          <label>
            <input
              type="checkbox"
              name="isDefault"
              checked={addrForm.isDefault}
              onChange={handleAddrChange}
            />
            Default address
          </label>
        </div>

        <button type="submit">Save Address</button>
      </form>

      <hr style={{ margin: "1.5rem 0" }} />

      <button onClick={handlePlaceOrder} disabled={placingOrder}>
        {placingOrder ? "Placing order..." : "Place Order"}
      </button>
    </section>
  );
}
