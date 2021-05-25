import React, { useEffect, useState } from "react";
import * as rb from "react-bootstrap";
import "./ListSchool.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as action from "../redux/actions.js";

const ListSchool = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const axiosData = async () => {
      const result = await axios.get("http://localhost:9000/api/schools");
      setData(result.data);
    };
    axiosData();
  }, []);

  const func = (id) => {
    dispatch(action.setIdSchool(id));
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {data.map((item, index) => (
        <rb.Card className="shadow hover-scale" style={{width : '70%', margin : '16px 0', padding : "20px"}} key={index} onClick={() => func(item._id)}>
          <Link to={`/schools/${item._id}/reviews`} className="d-flex flex-row" style={{textDecoration : "none"}}>
            <rb.Card.Img
              src={item.images[0]}
              className="school-img"
            ></rb.Card.Img>
            <rb.Card.Body>
              <rb.Card.Text className="school-name" style={{fontSize : '21px',fontWeight : '700'}}>
                {item.name}<span style={{fontSize : '16px',fontWeight : 'normal'}}>-{item.code}</span>
              </rb.Card.Text>
              <rb.Card.Text className="school-name">
                <span style={{fontWeight : '500', fontSize : '19px'}}>Location: </span>
                {item.location}
              </rb.Card.Text>
              <a href={item.website} className="school-name"><span  style={{fontWeight : '500', fontSize : '19px'}}>Website: </span> {item.website}</a>
              <div className="d-flex flex-row align-items-center">
                <rb.Badge
                  variant="success"
                  className="d-flex justify-content-center align-items-center school-badge"
                >
                  9.9
                </rb.Badge>
                <div>
                  <rb.Card.Text className="school-name">Tốt</rb.Card.Text>
                  <rb.Card.Text>n bài đánh giá</rb.Card.Text>
                </div>
              </div>
            </rb.Card.Body>
            <rb.Card.Img
              src={item.logo}
              className="school-logo"
            ></rb.Card.Img>
          </Link>
        </rb.Card>
      ))}
    </div>
  );
};

export default ListSchool;
