import React from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import Container from "./components/Container";

const Root = () => (
  <CartProvider>
    <div className="root">
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  </CartProvider>
);

export default Root;
