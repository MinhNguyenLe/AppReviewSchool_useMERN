import React from 'react';
import * as rb  from 'react-bootstrap';
import "./Navbar.css";
import Logo from "./Logo.js"
import Login from "./Login.js"
import Register from "./Register.js"

const Navbar =()=>{
  return(
    <div>
      <rb.Navbar expand="lg">
        <Logo></Logo>
          <rb.Nav className="mr-auto">
            <rb.NavDropdown className="btn draw-border" title="Ngành học" id="basic-nav-dropdown">
            <rb.NavDropdown.Item href="#action/3.1">Khoa hoc - Ky thuat</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.2">Xa hoi - Nhan van</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.3">Y duoc</rb.NavDropdown.Item>
            <rb.NavDropdown.Divider />
            <rb.NavDropdown.Item href="#action/3.4">Kinh tế</rb.NavDropdown.Item>
          </rb.NavDropdown>
            <rb.NavDropdown className="btn draw-border" title="Trường học" id="basic-nav-dropdown">
            <rb.NavDropdown.Item href="#action/3.1">Tại TP HCM</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.2">Tại Hà Nội</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.3">Tại miền Tây</rb.NavDropdown.Item>
            <rb.NavDropdown.Divider />
            <rb.NavDropdown.Item href="#action/3.4">Khu vực khác</rb.NavDropdown.Item>
          </rb.NavDropdown>
            <rb.NavDropdown className="btn draw-border" title="Khác" id="basic-nav-dropdown">
            <rb.NavDropdown.Item href="#action/3.1">Tin tức về WEB</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.2">Liên hệ hợp tác</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.3">Góp ý cho chúng tôi</rb.NavDropdown.Item>
            <rb.NavDropdown.Divider />
            <rb.NavDropdown.Item href="#action/3.4">Giới thiệu bạn bè</rb.NavDropdown.Item>
          </rb.NavDropdown>
          </rb.Nav>
          <Login></Login>
          <Register></Register>
      </rb.Navbar>
    </div>
  )
}

export default Navbar