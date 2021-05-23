import React, { useEffect, useState } from "react";
import * as rb from "react-bootstrap";
import "./ListReview.css";
import axios from "axios";

const ListComment = ({ showCmt }) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const axiosData = async () => {
  //     const result = await axios.get();
  //     setData(result.data);
  //   };
  //   axiosData();
  // }, []);
  return <div style={!showCmt ? { display: "none" } : {}}>comment</div>;
};

export default ListComment;
