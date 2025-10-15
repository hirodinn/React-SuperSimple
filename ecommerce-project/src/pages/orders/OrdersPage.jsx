import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header.jsx";
import "./OrdersPage.css";
import { Orders } from "./Orders.jsx";
export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);
  return (
    <>
      <title>Orders</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/src/assets/assets/orders-favicon.png"
      />
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return <Orders order={order} key={order.id} loadCart={loadCart} />;
          })}
        </div>
      </div>
    </>
  );
}
