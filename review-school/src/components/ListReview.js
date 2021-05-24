import React, { useEffect, useState, useRef } from "react";
import * as rb from "react-bootstrap";
import "./ListReview.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ListComment from "./ListComment.js";
import * as action from "../redux/actions.js";
import TextareaAutosize from 'react-textarea-autosize';

const ListReview = () => {
  const refPositive = useRef()
  const refNegative = useRef()
  const refAdvice = useRef()

  const refNewPositive = useRef()
  const refNewNegative = useRef()
  const refNewAdvice = useRef()

  const idSchool = useSelector((state) => state.idSchool);
  const idReview = useSelector((state) => state.idReview);

  const dispatch = useDispatch();

  const [listReview, setListReview] = useState([]);
  const [detailReview, setDetailReview] = useState({});

  const [showCmt, setShowCmt] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [success, setSuccess] = useState(0);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([
        axios.get(`http://localhost:9000/api/schools/${idSchool}/reviews`),
      ])
        .then(([listReview]) => {
          setListReview(listReview.data);
        })
        .catch();
    };
    axiosData();
  }, [success]);


  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`http://localhost:9000/api/reviews/${idReview}`)])
        .then(([dataDetailReview]) => {
          setDetailReview(dataDetailReview.data);
          refPositive.current.value = detailReview.positive;
          refNegative.current.value = detailReview.negative;
          refAdvice.current.value = detailReview.advice;
        })
        .catch((err) => console.log(err));
    };
    axiosData();
  }, [showEdit]);

  const editReview = (id) => {
    setShowEdit(true);
    dispatch(action.setIdReview(id));
  };
  const saveEdit=()=>{
    dispatch(action.setReview(refPositive.current.value,refNegative.current.value,refAdvice.current.value))
    const axiosData = async () => {
      await axios.put(`http://localhost:9000/api/reviews/${idReview}`,{
        positive : refPositive.current.value,
        negative : refNegative.current.value,
        advice : refAdvice.current.value
      });
      setSuccess(success + 1);
      setShowEdit(false)
    };
    axiosData();
  }
  const exitEdit=()=>{
    setShowEdit(false)
  }
  const btnShowCmt=(id)=>{
    setShowCmt(!showCmt)
    dispatch(action.setIdReview(id))
  }
  const writeReview=()=>{
    setShowWriteReview(true)
    // refNewPositive.current.value = ''
    // refNewNegative.current.value = ''
    // refNewAdvice.current.value = ''
  }
  const exitWriteReview=()=>{
    setShowWriteReview(false)
  }
  const saveAddReview=()=>{
    dispatch(action.setReview(refPositive.current.value,refNegative.current.value,refAdvice.current.value))
    const axiosData = async () => {
      await axios.post(`http://localhost:9000/api/reviews/anonymous`,{
        idSchool : idSchool,
        positive : refNewPositive.current.value,
        negative : refNewNegative.current.value,
        advice : refNewAdvice.current.value
      });
      setSuccess(success + 1);
      setShowWriteReview(false)
    };
    axiosData();
  }
  return (
    <div>
      <div style={!showEdit ? { display: "none" } : {}} className="editor">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span>Editor</span>
          <i
            onClick={exitEdit}
            class="fas fa-times"
            style={{ cursor: "pointer" }}
          ></i>
        </div>
        <div>
          <div>
            <rb.Card.Text className="review-title">Ưu điểm</rb.Card.Text>
            <TextareaAutosize ref={refPositive} className="edit-content" />
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Điểm cần cải thiện
            </rb.Card.Text>  
            <TextareaAutosize ref={refNegative} className="edit-content" />
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Trải nghiệm và lời khuyên
            </rb.Card.Text>
            <TextareaAutosize ref={refAdvice} className="edit-content" />
          </div>
          <rb.Button onClick={saveEdit}>Save</rb.Button>
        </div>
      </div>
      <div style={!showWriteReview ? { display: "none" } : {}} className="editor">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span>Write new review</span>
          <i
            onClick={exitWriteReview}
            class="fas fa-times"
            style={{ cursor: "pointer" }}
          ></i>
        </div>
        <div>
          <div>
            <rb.Card.Text className="review-title">Ưu điểm</rb.Card.Text>
            <TextareaAutosize ref={refNewPositive} className="edit-content" />
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Điểm cần cải thiện
            </rb.Card.Text>  
            <TextareaAutosize ref={refNewNegative} className="edit-content" />
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Trải nghiệm và lời khuyên
            </rb.Card.Text>
            <TextareaAutosize ref={refNewAdvice} className="edit-content" />
          </div>
          <rb.Button onClick={saveAddReview}>Save</rb.Button>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span>Đánh giá</span>
        <rb.Button onClick={writeReview}>Viết đánh giá</rb.Button>
      </div>
      {listReview.map((item, index) => (
        <rb.Card key={index}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div className="icon-user d-flex align-items-center justify-content-center">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <rb.Card.Text>{item.name}</rb.Card.Text>
                <rb.Card.Text>{item.createdAt}</rb.Card.Text>
              </div>
            </div>
            <div className="edit-review" onClick={() => editReview(item._id)}>
              <i class="far fa-edit"></i>
            </div>
          </div>
          <div>
            <rb.Card.Text className="review-title">Ưu điểm</rb.Card.Text>
            <rb.Card.Text className="review-content">
              {item.positive}
            </rb.Card.Text>
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Điểm cần cải thiện
            </rb.Card.Text>
            <rb.Card.Text className="review-content">
              {item.negative}
            </rb.Card.Text>
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Trải nghiệm và lời khuyên
            </rb.Card.Text>
            <rb.Card.Text className="review-content">
              {item.advice}
            </rb.Card.Text>
          </div>
          <rb.Button onClick={() => btnShowCmt(item._id)}>Reply</rb.Button>
          <ListComment showCmt={showCmt} id={item._id}></ListComment>
        </rb.Card>
      ))}
    </div>
  );
};

export default ListReview;
