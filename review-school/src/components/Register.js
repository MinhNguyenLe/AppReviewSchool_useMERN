import React from "react";
import * as rb from "react-bootstrap";
import "./ListReview.css";
import axios from "axios";
import "moment-timezone";
import useForm from "../useForm";
import validate from "../validate";
import { apiLocal } from "../dataGlobal.js";

const Register = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    register,
    validate
  );

  async function register() {
    await axios.post(`${apiLocal}/api/users/register`, {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
    });
  }
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ width: "100%", margin: "60px" }}
    >
      <rb.Card style={{ width: "400px" }}>
        <rb.Form style={{ padding: "20px" }} onSubmit={handleSubmit} noValidate>
          <rb.Form.Group>
            <rb.Form.Label>New name</rb.Form.Label>
            <rb.Form.Control
              type="text"
              required
              name="name"
              placeholder="Your name"
              value={values.name || ""}
              onChange={handleChange}
            />
            {errors.name && <p className="help is-danger">{errors.name}</p>}
          </rb.Form.Group>
          <rb.Form.Group>
            <rb.Form.Label>New nickname</rb.Form.Label>
            <rb.Form.Control
              type="text"
              name="username"
              placeholder="Your nickname"
              value={values.username || ""}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="help is-danger">{errors.username}</p>
            )}
          </rb.Form.Group>
          <rb.Form.Group controlId="formBasicEmail">
            <rb.Form.Label>New email address</rb.Form.Label>
            <rb.Form.Control
              type="email"
              name="email"
              placeholder="Your email"
              value={values.email || ""}
              onChange={handleChange}
            />
            {errors.email && <p className="help is-danger">{errors.email}</p>}
          </rb.Form.Group>
          <rb.Form.Group controlId="formBasicPassword">
            <rb.Form.Label>New password</rb.Form.Label>
            <rb.Form.Control
              type="password"
              name="password"
              placeholder="Your password"
              value={values.password || ""}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="help is-danger">{errors.password}</p>
            )}
          </rb.Form.Group>
          <rb.Button variant="primary" type="submit">
            Register
          </rb.Button>
        </rb.Form>
      </rb.Card>
    </div>
  );
};

export default Register;
