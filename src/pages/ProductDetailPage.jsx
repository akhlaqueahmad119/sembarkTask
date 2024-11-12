import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import Button from "../components/Button";
import "../styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  return (
    product && (
      <div className="product-detail">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <Button
          text="Add to Cart"
          onClick={() => addToCart(product)}
          styleType="primary"
        />
      </div>
    )
  );
};

export default ProductDetailPage;
