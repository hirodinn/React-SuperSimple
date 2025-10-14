import axios from "axios";
import Header from "../components/Header";
import { useParams } from "react-router";
import { Link } from "react-router";
import "./TrackingPage.css";
import { useEffect, useState } from "react";
import { Tracking } from "./Tracking";
export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const loadOrder = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };
    loadOrder();
  }, [orderId]);
  return (
    <>
      <Header cart={cart} />
      {order && (
        <Tracking
          orderProduct={order.products.find((product) => {
            return product.productId === productId;
          })}
        />
      )}
    </>
  );
}
