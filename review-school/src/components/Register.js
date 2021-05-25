import React, { useEffect, useState, useRef } from "react";
import * as rb from "react-bootstrap";
import "./ListReview.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import $ from 'jquery'
import * as action from "../redux/actions.js";
import 'moment-timezone';
import {Link} from 'react-router-dom'

const Register = () => {
  const refEmail = useRef()
  const refPass = useRef()
  const refName = useRef()
  const refUser = useRef()

  const [dataUser, setDataUser] = useState()
  const dispatch = useDispatch()

  const checkUser= async (e)=>{
    e.preventDefault();
    await axios.post(`http://localhost:9000/api/users/register`,{
      username: refUser.current.value,
      name: refName.current.value,
      email: refEmail.current.value,
      password: refPass.current.value,
    });
  }
  return (
    <div className="d-flex align-items-center justify-content-center" style={{width : '100%', margin:"60px"}}>
    <rb.Card style={{width : '400px'}}>
    <rb.Form style={{padding : '20px'}}>
    <rb.Form.Group>
        <rb.Form.Label>New name</rb.Form.Label>
        <rb.Form.Control ref={refName} type="text" placeholder="Your name" />
      </rb.Form.Group>
      <rb.Form.Group>
        <rb.Form.Label>New nickname</rb.Form.Label>
        <rb.Form.Control ref={refUser} type="text" placeholder="Your nickname" />
      </rb.Form.Group>
      <rb.Form.Group controlId="formBasicEmail">
        <rb.Form.Label>New email address</rb.Form.Label>
        <rb.Form.Control ref={refEmail} type="email" placeholder="Your email" />
      </rb.Form.Group>
      <rb.Form.Group controlId="formBasicPassword">
        <rb.Form.Label>New password</rb.Form.Label>
        <rb.Form.Control ref={refPass} type="password" placeholder="Your password" />
      </rb.Form.Group>
      <rb.Button variant="primary" type="submit" onSubmit={checkUser}>
        Register
      </rb.Button>
    </rb.Form>
    </rb.Card>
    </div>
  );
};

export default Register;
