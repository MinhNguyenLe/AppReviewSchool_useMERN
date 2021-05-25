import React, { useEffect, useState } from "react";
import * as rb from "react-bootstrap";
import "./ListReview.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TextareaAutosize from 'react-textarea-autosize';

const ListComment = ({ showCmt, id }) => {
  const idReview = useSelector((state) => state.idReview);

  const dispatch = useDispatch();

  const [listComment, setListComment] = useState([]);
  const [addCmt, setAddCmt] = useState(0)
  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`http://localhost:9000/api/reviews/${idReview}/comments`)])
        .then(([listComment]) => {
          setListComment(listComment.data);
        })
        .catch((err) => console.log(err));
    };
    axiosData();
  }, [addCmt]);

  return (
    <div style={!showCmt && id === idReview ? { display: "none" } : {}}>
      {listComment.map((item, index) => (
        <div key={index}>{item.content}</div>
      ))}
      <TextareaAutosize style={{width : '100%'}}/>
    </div>
  );
};

export default ListComment;
