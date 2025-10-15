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
    };
    fetchCheckoutData();
  }, []);
  useEffect(() => {
    const loadPaymentSummary = async () => {
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    loadPaymentSummary();
  }, [cart]);

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
          <div className="order-summary">
            {cart.length > 0 &&
              cart.map((cartItem) => {
                return (
                  <CheckoutOrderSummary
                    cartItem={cartItem}
                    deliveryOptions={deliveryOptions}
                    loadCart={loadCart}
                    key={cartItem.productId}
                  />
                );
              })}
          </div>

          {paymentSummary && (
            <CheckoutPaymentSummary
              paymentSummary={paymentSummary}
              loadCart={loadCart}
            />
          )}
        </div>
      </div>
    </>
  );
}
