import React, { memo } from "react";
import "../styles/Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 MyCompany. All rights reserved.</p>
        <ul className="footer-links">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </footer>
  );
};

export default memo(Footer);
