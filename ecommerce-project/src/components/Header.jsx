import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import "./header.css";
import { useState } from "react";
import axios from "axios";
export default function Header({ cart, setProducts }) {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const [searchBarValue, setSearchBarValue] = useState("");

  const searchBar = (event) => {
    setSearchBarValue(event.target.value);
  };
  const navigate = useNavigate();

  const searchForProduct = async (event) => {
    if (event.key === "Enter") {
      const response = await axios.get(
        `/api/products?search=${searchBarValue}`
      );
      setProducts(response.data);
      navigate("/");
    }
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={searchBar}
            value={searchBarValue}
            onKeyDown={searchForProduct}
          />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
