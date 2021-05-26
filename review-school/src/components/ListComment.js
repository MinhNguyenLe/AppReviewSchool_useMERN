import React, { useEffect, useState, useRef } from "react";
import * as rb from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as action from "../redux/actions.js";
import './ListComment.css';
import * as func from '../funcGlobal.js'

const ListComment = ({ showCmt, id ,setListComment,listComment}) => {
  const refCmt = useRef()
  
  const idReview = useSelector((state) => state.idReview);

  const dispatch = useDispatch();

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
    refCmt.current.value = ''
  }, [addCmt]);

  const submitCmt= async (e)=>{
    e.preventDefault();
    await axios.post(`http://localhost:9000/api/comments`,{
      idReview : idReview,
      content : refCmt.current.value,
      name : "Obama",
    });
    setAddCmt(addCmt + 1)
  }
  return (
    <div style={!showCmt && id === idReview ? { display: "none" } : {}}>
    <rb.Form onSubmit={submitCmt} style={{marginTop : "8px"}}>
        <rb.Form.Control onClick={()=> dispatch(action.setIdReview(id))} ref={refCmt} type="text" style={{width : '100%'}} />
      </rb.Form>
    <div className="ske-cmt">
    {listComment.map((item, index) => (
      <rb.Card key={index} className='d-flex flex-column ske-cmt-c'>
        <span className="cmt-name">{item.name}</span>
        <span className="cmt-content">{item.content}</span>
      </rb.Card>
    ))}
    </div>
    </div>
  );
};

export default ListComment;
