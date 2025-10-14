import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header.jsx";
import "./OrdersPage.css";
import { Orders } from "./Orders.jsx";
export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
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
            return <Orders order={order} key={order.id} />;
          })}
        </div>
      </div>
    </>
  );
}
