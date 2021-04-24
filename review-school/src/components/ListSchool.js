import React from 'react';
import * as rb  from 'react-bootstrap';
import "./ListSchool.css";

const ListSchool =()=>{
  return(
    <div>
      <rb.Card>
        <rb.Card.Link href="/review/nameSchool" className="d-flex flex-row">
          <rb.Card.Img src="https://edu2review.com/upload/school-images/truong-dai-hoc-kinh-te-luat/img/792w-1-truong-dai-hoc-kinh-te-luat.jpg" className="school-img"></rb.Card.Img>
          <rb.Card.Body>
            <rb.Card.Text className="school-name">Trường đại học CNTT - ĐHQG</rb.Card.Text>
            <rb.Card.Text className="school-name">Verified by OurApp</rb.Card.Text>
            <div className="d-flex flex-row align-items-center">
              <rb.Badge variant="success" className="d-flex justify-content-center align-items-center school-badge">9.0</rb.Badge>
              <div>
                <rb.Card.Text className="school-name">Tốt</rb.Card.Text>
                <rb.Card.Text>n đánh giá</rb.Card.Text>
              </div>
            </div>
          </rb.Card.Body>
        </rb.Card.Link>
      </rb.Card>
    </div>
  )
}

export default ListSchool