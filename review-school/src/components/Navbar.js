import React, { useEffect, useState } from "react";
import * as rb from "react-bootstrap";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = useSelector((state) => state.token);

  const aStyle = {
    textDecoration: "none",
    color: "#0077cc",
    cursor: "pointer",
  };
  const imgStyle = {
    width: "100%",
    maxWidth: "100%",
    height: "auto",
  };
  return (
    <div>
      <header className="header-surface">
        <div className="nav-container-surface">
          <nav className="nav-surface">
            <div className="nav-brand">
              <a style={aStyle} href="#" className="nav-icon">
                <i className="fab fa-stack-overflow" />
                <div className="nav-icon-text">
                  Edu <span className="nav-bold-text">Review</span>
                </div>
              </a>
            </div>
            <div className="nav-base-links">
              <ul className="ul-n">
                <li>
                  <a className="ft-sz" style={aStyle} href="/schools">
                    Review
                  </a>
                </li>
                <li>
                  <a className="ft-sz" style={aStyle} href="#">
                    Forum
                  </a>
                </li>
                <li>
                  <a className="ft-sz" style={aStyle} href="#">
                    More
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-search">
              <div className="search-container-surface">
                <i className="fas fa-search" />
                <input type="text" id placeholder="Search..." />
              </div>
            </div>
            {!token ? (
              <div className="nav-right-buttons">
                <div className="search-btn-surface">
                  <i className="fas fa-search" />
                </div>
                <Link
                  style={aStyle}
                  to="/login"
                  className="ft-sz btn-surface btn-surface-login"
                >
                  Log in
                </Link>
                <Link
                  style={aStyle}
                  to="/register"
                  className="ft-sz btn-surface btn-surface-register"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div>User!!!</div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
