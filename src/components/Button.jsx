import React, { memo } from "react";
import "../styles/button.css";
const Button = memo(
  ({ text, onClick, type = "button", styleType = "primary" }) => {
    return (
      <button className={`btn ${styleType}`} onClick={onClick} type={type}>
        {text}
      </button>
    );
  }
);

export default Button;
