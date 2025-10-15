import axios from "axios";
import formatMoney from "../../utils/money";
import dayjs from "dayjs";
import { useState } from "react";
import { CheckoutDeliveryOptions } from "./CheckoutDeliveryOptions";
export function CheckoutOrderSummary({ deliveryOptions, loadCart, cartItem }) {
  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  const [toUpdateQuantity, setToUpdateQuantity] = useState(true);
  const [updateQuantityValue, setUpdateQuantityValue] = useState(
    cartItem.quantity
  );
  const updateFunctionality = async () => {
    setToUpdateQuantity(!toUpdateQuantity);
    if (updateQuantityValue === 0) {
      await deleteCartItem();
    } else if (updateQuantityValue < 1) {
      alert("Quantity can't be negative Number");
      setUpdateQuantityValue(cartItem.quantity);
    } else {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: updateQuantityValue,
      });
      await loadCart();
    }
  };

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  const changeUpdateQuantityValue = (event) => {
    setUpdateQuantityValue(Number(event.target.value));
  };
  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMMM D"
        )}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            ${formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            Quantity:{" "}
            {toUpdateQuantity ? (
              <span>
                <span className="quantity-label">{cartItem.quantity}</span>
              </span>
            ) : (
              <span>
                <input
                  type="number"
                  className="update-quantity-input"
                  onChange={changeUpdateQuantityValue}
                  value={updateQuantityValue}
                ></input>
              </span>
            )}
            <span
              className="update-quantity-link link-primary"
              onClick={updateFunctionality}
            >
              {toUpdateQuantity ? "Update" : "Save"}
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >
              Delete
            </span>
          </div>
        </div>
        <CheckoutDeliveryOptions
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
          loadCart={loadCart}
        />
      </div>
    </div>
  );
}
