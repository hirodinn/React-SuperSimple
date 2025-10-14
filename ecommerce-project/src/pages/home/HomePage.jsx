import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";
export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/src/assets/assets/home-favicon.png"
      />
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
