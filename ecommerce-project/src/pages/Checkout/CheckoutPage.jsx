import axios from "axios";
import { useState, useEffect } from "react";
import "./CheckoutPage.css";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutPaymentSummary from "./CheckoutPaymentSummary";
import { CheckoutOrderSummary } from "./CheckoutOrderSummary";

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, []);
  console.log(cart);
  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/src/assets/assets/cart-favicon.png"
      />
      <title>Checkout</title>
      <CheckoutHeader />
      {}
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <CheckoutOrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          {paymentSummary && (
            <CheckoutPaymentSummary paymentSummary={paymentSummary} />
          )}
        </div>
      </div>
    </>
  );
}
