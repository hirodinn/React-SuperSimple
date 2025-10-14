import { Route, Routes } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import "./App.css";
import { TrackingPage } from "./pages/TrackingPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
