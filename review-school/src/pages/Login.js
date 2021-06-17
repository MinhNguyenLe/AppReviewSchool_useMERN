import React, { useState, useEffect } from "react";
import "./Login.css";
import $ from "jquery";
import axios from "axios";
import "moment-timezone";
import useForm from "../useForm";
import useFormLogin from "../useFormLogin";
import validate from "../validate";
import validateLogin from "../validateLogin";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/actions.js";
import { apiLocal } from "../dataGlobal.js";

const Login = () => {
  const dispatch = useDispatch();

  let location = useLocation();
  let history = useHistory();

  const { valuesLogin, errorsLogin, handleChangeLogin, handleSubmitLogin } =
    useFormLogin(login, validateLogin);
  async function login() {
    await axios.post(`${apiLocal}/api/users/login`, {
      email: valuesLogin.emailLogin,
      password: valuesLogin.passLogin,
    });
    dispatch(action.setToken(true));
    dispatch(action.setEmail(valuesLogin.emailLogin));
    history.push("/schools");
  }

  const {
    valuesRegister,
    errorsRegister,
    handleChangeRegister,
    handleSubmitRegister,
  } = useForm(register, validate);

  async function register() {
    await axios.post(`${apiLocal}/api/users/register`, {
      name: valuesRegister.name,
      username: valuesRegister.username,
      email: valuesRegister.email,
      password: valuesRegister.password,
    });
    dispatch(action.setToken(true));
    dispatch(action.setEmail(valuesRegister.email));
    history.push("/schools");
    // history.push("/login");
    // document.getElementById("container").classList.remove("right-panel-active");
  }

  const clickSignUp = () => {
    console.log(history);
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
        <form onSubmit={handleSubmitRegister} className="form-login" action="#">
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
          <input
            value={valuesRegister.name || ""}
            name="name"
            className="input-login"
            type="text"
            required
            onChange={handleChangeRegister}
            placeholder="Name"
          />
          {errorsRegister.name && (
            <p className="help is-danger">{errorsRegister.name}</p>
          )}
          <input
            required
            value={valuesRegister.username || ""}
            onChange={handleChangeRegister}
            name="username"
            className="input-login"
            type="text"
            placeholder="Nickname(Your name in app)"
          />
          {errorsRegister.username && (
            <p className="help is-danger">{errorsRegister.username}</p>
          )}
          <input
            required
            onChange={handleChangeRegister}
            value={valuesRegister.email || ""}
            name="email"
            className="input-login"
            type="email"
            placeholder="Email"
          />
          {errorsRegister.email && (
            <p className="help is-danger">{errorsRegister.email}</p>
          )}
          <input
            required
            onChange={handleChangeRegister}
            value={valuesRegister.password || ""}
            name="password"
            className="input-login"
            type="password"
            placeholder="Password"
          />
          {errorsRegister.password && (
            <p className="help is-danger">{errorsRegister.password}</p>
          )}
          <button className="btn-login">Sign Up</button>
          <a href="/schools" className="any-link">
            I'm anonymous
          </a>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmitLogin} className="form-login" action="#">
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
          <input
            name="emailLogin"
            value={valuesLogin.emailLogin || ""}
            onChange={handleChangeLogin}
            required
            className="input-login"
            type="email"
            placeholder="Email"
          />
          {errorsLogin.emailLogin && (
            <p className="help is-danger">{errorsLogin.emailLogin}</p>
          )}
          <input
            name="passLogin"
            value={valuesLogin.passLogin || ""}
            onChange={handleChangeLogin}
            required
            className="input-login"
            type="password"
            placeholder="Password"
          />
          {errorsLogin.passLogin && (
            <p className="help is-danger">{errorsLogin.passLogin}</p>
          )}
          <a style={{ fontSize: "14px" }} href="#">
            Forgot your password?
          </a>
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
            <a href="/schools" className="spe-any-link">
              I'm anonymous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
