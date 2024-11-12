import React, { useContext, useMemo, useCallback } from "react";
import CartContext from "../context/CartContext";
import Button from "./Button";
import "../styles/Cart.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQty } =
    useContext(CartContext);

  const totalQuantity = useMemo(
    () => cartItems.reduce((acc, { qty }) => acc + qty, 0),
    [cartItems]
  );
  const totalPrice = useMemo(
    () => cartItems.reduce((acc, { price, qty }) => acc + price * qty, 0),
    [cartItems]
  );

  const changeItemQty = useCallback(
    (id, delta) => {
      const itemIndex = cartItems.findIndex((item) => item.id === id);
      if (itemIndex === -1) return;

      const updatedCartItems = [...cartItems];
      const updatedItem = updatedCartItems[itemIndex];

      const newQty = updatedItem.qty + delta;
      if (newQty <= 0) {
        removeFromCart(id);
      } else {
        updatedItem.qty = newQty;
        updateCartItemQty(id, newQty);
      }
    },
    [cartItems, removeFromCart, updateCartItemQty]
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(({ id, image, title, price, qty }) => (
              <div key={id} className="cart-item">
                <img src={image} alt={title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{title}</h4>
                  <p className="cart-item-price">${(price * qty).toFixed(2)}</p>
                  <div className="cart-item-qty">
                    <span>Qty:</span>
                    <div className="qty-controls">
                      <Button
                        text={<FaMinus />}
                        onClick={() => changeItemQty(id, -1)}
                        styleType="qty-btn"
                      />
                      <span className="qty-display">{qty}</span>
                      <Button
                        text={<FaPlus />}
                        onClick={() => changeItemQty(id, 1)}
                        styleType="qty-btn"
                      />
                    </div>
                  </div>
                  <Button
                    text="Remove"
                    onClick={() => removeFromCart(id)}
                    styleType="danger"
                    className="cart-remove-btn"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p className="total-items">Total Items: {totalQuantity}</p>
            <p className="total-price">Total Value: ${totalPrice.toFixed(2)}</p>
            <Button
              text="Proceed to Checkout"
              onClick={() => console.log("Proceeding to checkout")}
              styleType="checkout-btn"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
