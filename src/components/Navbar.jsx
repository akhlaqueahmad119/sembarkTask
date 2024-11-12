import React, { memo, useContext, useMemo } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = useMemo(
    () => cartItems.reduce((acc, curr) => acc + curr.qty, 0),
    [cartItems]);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">
        Cart
        {totalQuantity > 0 && (
          <span className="cart-badge">{totalQuantity}</span>
        )}
      </Link>
    </nav>
  );
};


export default memo(Navbar);
