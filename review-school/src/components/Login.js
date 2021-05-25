import React, { useEffect, useState, useRef } from "react";
import * as rb from "react-bootstrap";
import "./ListReview.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import $ from 'jquery'
import * as action from "../redux/actions.js";
import 'moment-timezone';
import {Link} from 'react-router-dom'

const Login = () => {
  const refUser = useRef()
  const refPass = useRef()

  const [dataUser, setDataUser] = useState()
  const dispatch = useDispatch()

  const checkUser= async (e)=>{
    e.preventDefault();
    await axios.post(`http://localhost:9000/api/users/login`,{
      username : refUser.current.value,
      password : refPass.current.value
    });
  }
  return (
    <div className="d-flex align-items-center justify-content-center" style={{width : '100%', margin:"60px"}}>
    <rb.Card style={{width : '400px'}}>
    <rb.Form style={{padding : '20px'}}>
      <rb.Form.Group controlId="formBasicEmail">
      <rb.Form.Label>Email address</rb.Form.Label>
      <rb.Form.Control ref={refUser} type="email" placeholder="Enter email" />
      </rb.Form.Group>
        <rb.Form.Group controlId="formBasicPassword">
      <rb.Form.Label>Password</rb.Form.Label>
      <rb.Form.Control ref={refPass} type="password" placeholder="Password" />
    </rb.Form.Group>
    <rb.Button variant="primary" type="submit" onSubmit={checkUser}>
      Login
    </rb.Button>
  </rb.Form>
  </rb.Card>
  </div>
  );
};

export default Login;
