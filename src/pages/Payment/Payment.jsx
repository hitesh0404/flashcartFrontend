const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = async (orderData, userDetails) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    alert("Razorpay SDK failed to load");
    throw new Error("Razorpay SDK failed to load");
  }

  return new Promise((resolve, reject) => {
    const options = {
      key: "rzp_test_SeYjHljAhVr7Lm",
      amount: orderData.amount, // in paise
      currency: orderData.currency,
      name: "Flashcart",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderData.id, // this should be the Razorpay order_id

      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },

      notes: {
        address: "Razorpay Corporate Office",
      },

      theme: {
        color: "#3399cc",
      },

      handler: function (response) {
        // This runs only on successful payment
        console.log("Payment success:", response);
        resolve(response); // resolve promise with Razorpay response
      },

      modal: {
        ondismiss: () => {
          reject(new Error("Payment popup closed"));
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};

export default Payment;
