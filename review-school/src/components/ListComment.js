import React, { useEffect, useState, useRef } from "react";
import * as rb from "react-bootstrap";
import "./ListReview.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as action from "../redux/actions.js";
import TextareaAutosize from 'react-textarea-autosize';

const ListComment = ({ showCmt, id }) => {
  const refCmt = useRef()
  
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

  const submitCmt= async (e)=>{
    e.preventDefault();
    await axios.post(`http://localhost:9000/api/comments`,{
      idReview : id,
      content : refCmt.current.value,
      name : "",
    });
    setAddCmt(addCmt + 1)
    refCmt.current.value = ''
  }
  return (
    <div style={!showCmt && id === idReview ? { display: "none" } : {}}>
      {listComment.map((item, index) => (
        <div key={index}>{item.content}</div>
      ))}
      <form onSubmit={submitCmt}>
        <input ref={refCmt} type="text" style={{width : '100%'}} placeholder=". . ." />
      </form>
    </div>
  );
};

export default ListComment;
