import React from "react";
import * as rb from "react-bootstrap";
import "./Navbar.css";
import Logo from "./Logo.js";
import Register from "./Register.js";
import { Link } from "react-router-dom";
const Navbar = () => {
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
              <div className="hamburger-menu-container-surface">
                <div className="hamburger-menu">
                  <div className="line" />
                  <div className="line" />
                  <div className="line" />
                </div>
                <div className="nav-dropdown-menu">
                  <a style={aStyle} href="#" className="current-link">
                    Home
                  </a>
                  <h5>Public</h5>
                  <ul className="nav-ul">
                    <li className="nav-item">
                      <i className="fas fa-globe-europe" />
                      <a style={aStyle} href="#" className="nav-link">
                        Stack Overflow
                      </a>
                    </li>
                    <li className="nav-item">
                      <a style={aStyle} href="#" className="nav-link">
                        Tags
                      </a>
                    </li>
                    <li className="nav-item">
                      <a style={aStyle} href="#" className="nav-link">
                        Users
                      </a>
                    </li>
                  </ul>
                  <h5>Find a Job</h5>
                  <ul className="nav-ul">
                    <li className="nav-item">
                      <a style={aStyle} href="#" className="nav-link">
                        Jobs
                      </a>
                    </li>
                    <li className="nav-item">
                      <a style={aStyle} href="#" className="nav-link">
                        Companies
                      </a>
                    </li>
                  </ul>
                  <h5>
                    Teams{" "}
                    <a style={aStyle} href="#">
                      What's this ?
                    </a>
                  </h5>
                  <a style={aStyle} href="#" className="nav-link">
                    <i className="fas fa-briefcase" />
                    <span>Free 30 Day Trial</span>
                  </a>
                </div>
              </div>
              <a style={aStyle} href="#" className="nav-icon">
                <i className="fab fa-stack-overflow" />
                <div className="nav-icon-text">
                  stack <span className="nav-bold-text">overflow</span>
                </div>
              </a>
            </div>
            <div className="nav-base-links">
              <ul className="ul-n">
                <li>
                  <a style={aStyle} href="#">
                    About
                  </a>
                </li>
                <li>
                  <a style={aStyle} href="#">
                    Products
                  </a>
                </li>
                <li>
                  <a style={aStyle} href="#">
                    For Teams
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-search">
              <div className="search-container-surface">
                <i className="fas fa-search" />
                <input type="text" id placeholder="Search..." />
              </div>
              <div className="search-hints">
                <div className="search-arrow-up" />
                <div className="search-hint-body">
                  <div className="hints-grid-column">
                    <div className="hint-text">
                      <span>[tag] </span> search within a tag
                    </div>
                    <div className="hint-text">
                      <span>user:1234 </span> search by author
                    </div>
                    <div className="hint-text">
                      <span>"words here"</span> exact phrase{" "}
                    </div>
                  </div>
                  <div className="hints-grid-column">
                    <div className="hint-text">
                      <span>answers:0</span> unanswered questions
                    </div>
                    <div className="hint-text">
                      <span> score:3</span> posts with a 3+ score
                    </div>
                    <div className="hint-text">
                      <span>isaccepted:yes </span> search within status
                    </div>
                  </div>
                </div>
                <div className="search-hint-footer">
                  <a style={aStyle} href="#" className="btn-surface">
                    Ask a question
                  </a>
                  <a style={aStyle} href="#" className="search-help">
                    Search help
                  </a>
                </div>
              </div>
            </div>
            <div className="nav-right-buttons">
              <div className="search-btn-surface">
                <i className="fas fa-search" />
              </div>
              <Link
                style={aStyle}
                to="/login"
                className="btn-surface btn-surface-login"
              >
                Log in
              </Link>
              <Link
                style={aStyle}
                to="/register"
                className="btn-surface btn-surface-register"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
