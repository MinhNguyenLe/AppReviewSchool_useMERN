import React, { useEffect, useState } from "react";
import * as rb from "react-bootstrap";
import "./ListReview.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ListComment from "./ListComment.js";
import * as action from "../redux/actions/reviewActions.js";

const ListReview = () => {
  const idSchool = useSelector((state) => state.idSchool);
  const idReview = useSelector((state) => state.idReview);
  const dispatch = useDispatch();

  const [listReview, setListReview] = useState([]);
  const [detailReview, setDetailReview] = useState({});

  const [showCmt, setShowCmt] = useState(false);
  const [successEdit, setSuccessEdit] = useState(0);
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
  }, [successEdit]);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`http://localhost:9000/api/reviews/${idReview}`)])
        .then(([detailReview]) => {
          setDetailReview(detailReview.data);
        })
        .catch((err) => console.log(err));
    };
    axiosData();
  }, [showEdit]);

  const editReview = (id) => {
    setShowEdit(true);
    dispatch(action.setIdReview(id));
  };
  // const saveEdit=()=>{
  //   const axiosData = async () => {
  //     const axiosData = async () => {
  //       await axios.put(`http://localhost:9000/api/reviews/${idReview}`,{

  //       });
  //       setSuccessEdit(successEdit + 1);
  //       setShowEdit(false)
  //     };
  //     axiosData();
  //   };
  //   axiosData();
  // }
  return (
    <div>
      <div style={!showEdit ? { display: "none" } : {}} className="editor">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span>Editor</span>
          <i
            onClick={() => setShowEdit(false)}
            class="fas fa-times"
            style={{ cursor: "pointer" }}
          ></i>
        </div>
        <div>
          <div>
            <rb.Card.Text className="review-title">Ưu điểm</rb.Card.Text>
            <input className="edit-content" value={detailReview.positive} />
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Điểm cần cải thiện
            </rb.Card.Text>
            <input className="edit-content" value={detailReview.negative} />
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Trải nghiệm và lời khuyên
            </rb.Card.Text>
            <input className="edit-content" value={detailReview.advice} />
          </div>
          <rb.Button onClick={saveEdit()}>Save</rb.Button>
        </div>
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
              -{item.positive}
            </rb.Card.Text>
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Điểm cần cải thiện
            </rb.Card.Text>
            <rb.Card.Text className="review-content">
              -{item.negative}
            </rb.Card.Text>
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Trải nghiệm và lời khuyên
            </rb.Card.Text>
            <rb.Card.Text className="review-content">
              -{item.advice}
            </rb.Card.Text>
          </div>
          <rb.Button onClick={() => setShowCmt(!showCmt)}>Reply</rb.Button>
          <ListComment showCmt={showCmt}></ListComment>
        </rb.Card>
      ))}
    </div>
  );
};

export default ListReview;
