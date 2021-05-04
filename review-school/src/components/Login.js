import React, { useState, setState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./Navbar.css";
import Captcha from "./Captcha"


const Login = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const login = (e) => {
        e.preventDefault();
        alert(email + "     " + password);
    }

    return (
        <div>
            <Modal show={show} animation="true" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} value={email} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                        </Form.Group>
                        <Form.Group controlId="formCaptcha">
                            <Form.Label>Captcha</Form.Label>
                            <Captcha></Captcha>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={login}>
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    );
}

export default Login;