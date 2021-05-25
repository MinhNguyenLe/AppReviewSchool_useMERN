import React from "react";
import "./Logo.css";

const Logo = () => {
  return (
    <div>
      <div className="logo-holder logo">
        <a href="">
          <i className="fas fa-book-open"></i>
          <div className="left">
            <h3>School</h3>
            <p>you want to review anything...!</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Logo;
