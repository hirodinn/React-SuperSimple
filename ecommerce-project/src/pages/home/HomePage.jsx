import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";
export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);
  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/src/assets/assets/home-favicon.png"
      />
      <title>Ecommerce Project</title>
      <Header cart={cart} setProducts={setProducts} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
