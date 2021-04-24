import React from 'react';
import * as rb  from 'react-bootstrap';
import "./Navbar.css";

const Navbar =()=>{
  return(
    <div>
      <rb.Navbar expand="lg">
        <rb.Navbar.Brand href="/">OurApp</rb.Navbar.Brand>   
          <rb.Nav className="mr-auto">
            <rb.Nav.Link href="#home">Home</rb.Nav.Link>
            <rb.NavDropdown title="Ngành học" id="basic-nav-dropdown">
            <rb.NavDropdown.Item href="#action/3.1">Khoa hoc - Ky thuat</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.2">Xa hoi - Nhan van</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.3">Y duoc</rb.NavDropdown.Item>
            <rb.NavDropdown.Divider />
            <rb.NavDropdown.Item href="#action/3.4">Kinh tế</rb.NavDropdown.Item>
          </rb.NavDropdown>
            <rb.NavDropdown title="Trường học" id="basic-nav-dropdown">
            <rb.NavDropdown.Item href="#action/3.1">Tại TP HCM</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.2">Tại Hà Nội</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.3">Tại miền Tây</rb.NavDropdown.Item>
            <rb.NavDropdown.Divider />
            <rb.NavDropdown.Item href="#action/3.4">Khu vực khác</rb.NavDropdown.Item>
          </rb.NavDropdown>
            <rb.NavDropdown title="Khác" id="basic-nav-dropdown">
            <rb.NavDropdown.Item href="#action/3.1">Tin tức về WEB</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.2">Liên hệ hợp tác</rb.NavDropdown.Item>
            <rb.NavDropdown.Item href="#action/3.3">Góp ý cho chúng tôi</rb.NavDropdown.Item>
            <rb.NavDropdown.Divider />
            <rb.NavDropdown.Item href="#action/3.4">Giới thiệu bạn bè</rb.NavDropdown.Item>
          </rb.NavDropdown>
          </rb.Nav>
          <rb.Button variant="success">Login</rb.Button>
          <rb.Button variant="outline-success">Register</rb.Button>
      </rb.Navbar>
    </div>
  )
}

export default Navbar