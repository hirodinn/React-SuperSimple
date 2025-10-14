import axios from "axios";
import { useState, useEffect } from "react";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutPaymentSummary from "./CheckoutPaymentSummary";
import { CheckoutOrderSummary } from "./CheckoutOrderSummary";
import "./CheckoutPage.css";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(response.data);
      await loadPaymentSummary();
    };
    fetchCheckoutData();
  }, []);
  const loadPaymentSummary = async () => {
    const response = await axios.get("/api/payment-summary");
    setPaymentSummary(response.data);
  };
  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/src/assets/assets/cart-favicon.png"
      />
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />
      {}
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <CheckoutOrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
            loadPaymentSummary={loadPaymentSummary}
          />

          {paymentSummary && (
            <CheckoutPaymentSummary paymentSummary={paymentSummary} />
          )}
        </div>
      </div>
    </>
  );
}
