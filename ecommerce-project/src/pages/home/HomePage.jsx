import axios from "axios";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";
export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    console.log(search);
    const getHomeData = async () => {
      const response = await axios.get(
        `/api/products${search !== null ? `?search=${search}` : "/"}`
      );
      setProducts(response.data);
    };
    getHomeData();
  }, [search]);
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
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
