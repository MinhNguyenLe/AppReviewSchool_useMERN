import React from 'react';
import * as rb  from 'react-bootstrap';
import "./FilterType1.css";

const FilterType1 =()=>{
  return(
    <div className="d-flex flex-row">
      <div className="d-flex flex-row">
        <rb.Dropdown>
          <rb.Dropdown.Toggle variant="success" id="dropdown-basic">
            Cả nước
          </rb.Dropdown.Toggle>
          <rb.Dropdown.Menu>
            <rb.Dropdown.Item href="#/action-1">HCM</rb.Dropdown.Item>
            <rb.Dropdown.Item href="#/action-2">HN</rb.Dropdown.Item>
            <rb.Dropdown.Item href="#/action-3">Khác</rb.Dropdown.Item>
          </rb.Dropdown.Menu>
        </rb.Dropdown>
        <rb.Dropdown>
          <rb.Dropdown.Toggle variant="success" id="dropdown-basic">
            Ngành học
          </rb.Dropdown.Toggle>
          <rb.Dropdown.Menu>
            <rb.Dropdown.Item href="#/action-1">CNTT</rb.Dropdown.Item>
            <rb.Dropdown.Item href="#/action-2">Y duoc</rb.Dropdown.Item>
            <rb.Dropdown.Item href="#/action-3">Kinh tế</rb.Dropdown.Item>
          </rb.Dropdown.Menu>
        </rb.Dropdown>
        <rb.Dropdown>
          <rb.Dropdown.Toggle variant="success" id="dropdown-basic">
            Đại học
          </rb.Dropdown.Toggle>
          <rb.Dropdown.Menu>
            <rb.Dropdown.Item href="#/action-1">ĐHQG</rb.Dropdown.Item>
            <rb.Dropdown.Item href="#/action-2">ĐH Y Duoc</rb.Dropdown.Item>
            <rb.Dropdown.Item href="#/action-3">Khác</rb.Dropdown.Item>
          </rb.Dropdown.Menu>
        </rb.Dropdown>
      </div>
      <rb.Form className="d-flex flex-row">
        <rb.Form.Group controlId="formBasicEmail">
          <rb.Form.Label>Search</rb.Form.Label>
          <rb.Form.Control type="Search" placeholder="Search" />
        </rb.Form.Group>
      </rb.Form>
    </div>
  )
}

export default FilterType1