import React from "react";
import "./Login.css";
import $ from "jquery";
import axios from "axios";
import "moment-timezone";
import { useLocation } from "react-router-dom";
const Login = () => {
  let location = useLocation();

  const clickSignUp = () => {
    document.getElementById("container").classList.add("right-panel-active");
  };
  const clickSignIn = () => {
    document.getElementById("container").classList.remove("right-panel-active");
  };
  return (
    <div
      className={`container ${
        location.pathname === "/register" ? "right-panel-active" : ""
      }`}
      id="container"
    >
      <div className="form-container sign-up-container">
        <form className="form-login" action="#">
          <h1 className="h1-login">Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span className="span-login">or use your email for registration</span>
          <input className="input-login" type="text" placeholder="Name" />
          <input className="input-login" type="email" placeholder="Email" />
          <input
            className="input-login"
            type="password"
            placeholder="Password"
          />
          <button className="btn-login">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form className="form-login" action="#">
          <h1 className="h1-login">Sign in</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span className="span-login">or use your account</span>
          <input className="input-login" type="email" placeholder="Email" />
          <input
            className="input-login"
            type="password"
            placeholder="Password"
          />
          <a href="#">Forgot your password?</a>
          <button className="btn-login">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="h1-login">Welcome Back!</h1>
            <p className="p-login">
              To keep connected with us please login with your personal info
            </p>
            <button
              className="ghost btn-login"
              id="signIn"
              onClick={clickSignIn}
            >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="h1-login">Hello, Friend!</h1>
            <p className="p-login">
              Enter your personal details and start journey with us
            </p>
            <button
              className="ghost btn-login"
              id="signUp"
              onClick={clickSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
