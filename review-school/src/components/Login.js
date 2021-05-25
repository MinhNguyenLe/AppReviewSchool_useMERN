import React, { useState, setState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./Navbar.css";
import Captcha from "./Captcha"
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


const Login = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();

        const axiosData = async () => {
          var res = await axios.post(`http://localhost:9000/api/users/login`,{
            username: email,
            password: password
          });
          console.log(res);
          if(res.data['msg'] === "Login successful!")
          {
            localStorage.setItem("x-access-token", res.headers['x-access-token']);
            setShow(!show);
          }
          else
            alert("Tai khoan hoac mat khau khong dung");
        };
        axiosData();
    }

    return (
        <div>
            <Modal show={show} animation="true" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => login(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={e => setEmail(e.target.value)} value={email} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                        </Form.Group>
                        <Form.Group controlId="formCaptcha">
                            <Form.Label>Captcha</Form.Label>
                            <Captcha></Captcha>
                        </Form.Group>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Login;