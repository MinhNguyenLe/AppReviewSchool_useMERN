import React, { useEffect, useState, useRef } from "react";
import * as rb from "react-bootstrap";
import "./ListReview.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ListComment from "./ListComment.js";
import $ from "jquery";
import * as action from "../redux/actions.js";
import TextareaAutosize from "react-textarea-autosize";
import Moment from "react-moment";
import "moment-timezone";
import { Link, useParams } from "react-router-dom";
import * as func from "../funcGlobal.js";
import Loading from "./Loading.js";

const ListReview = () => {
  let params = useParams();

  const [loading, setLoading] = useState(true);

  const refPositive = useRef();
  const refNegative = useRef();
  const refAdvice = useRef();

  const refPointForSchool = useRef();

  const refNewPositive = useRef();
  const refNewNegative = useRef();
  const refNewAdvice = useRef();

  const idSchool = useSelector((state) => state.idSchool);
  const idReview = useSelector((state) => state.idReview);

  const dispatch = useDispatch();

  const [listReview, setListReview] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [school, setSchool] = useState([]);
  const [detailReview, setDetailReview] = useState({});

  const [showWriteReview, setShowWriteReview] = useState(false);
  const [success, setSuccess] = useState(0);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([
        axios.get(`http://localhost:9000/api/schools/${params.id}`),
        axios.get(`http://localhost:9000/api/schools/${params.id}/reviews`),
      ])
        .then(([school, listReview]) => {
          setSchool(school.data);
          setListReview(listReview.data);
          setLoading(false);
        })
        .catch();
    };
    axiosData();
  }, [success, params.id]);

  // useEffect(() => {
  //   const axiosData = () => {
  //     Promise.all([
  //       axios.get(`http://localhost:9000/api/schools/${idSchool}/reviews`),
  //     ])
  //       .then(([listReview]) => {
  //         setListReview(listReview.data);

  //       })
  //       .catch();
  //   };
  //   axiosData();
  // }, [success]);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`http://localhost:9000/api/reviews/${idReview}`)])
        .then(([dataDetailReview]) => {
          setDetailReview(dataDetailReview.data);
          refPositive.current.value = dataDetailReview.data.positive;
          refNegative.current.value = dataDetailReview.data.negative;
          refAdvice.current.value = dataDetailReview.data.advice;
        })
        .catch((err) => console.log(err));
    };
    axiosData();
  }, [showEdit]);

  // useEffect(() => {
  //   const axiosData = () => {
  //     Promise.all([
  //       axios.get(`http://localhost:9000/api/reviews/${idReview}/comments`),
  //     ])
  //       .then(([listComment]) => {
  //         setListComment(listComment.data);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   axiosData();
  // }, []);

  const editReview = (id) => {
    setShowEdit(true);
    func.scrollTop();
    dispatch(action.setIdReview(id));
    func.disableScrolling();
  };
  const saveEdit = async () => {
    dispatch(
      action.setReview(
        refPositive.current.value,
        refNegative.current.value,
        refAdvice.current.value
      )
    );
    await axios.put(`http://localhost:9000/api/reviews/${idReview}`, {
      positive: refPositive.current.value,
      negative: refNegative.current.value,
      advice: refAdvice.current.value,
    });
    setSuccess(success + 1);
    setShowEdit(false);
  };
  const exitEdit = () => {
    setShowEdit(false);
    func.enableScrolling();
  };
  const btnShowCmt = (id) => {
    $(`#${id}`).toggle();
    Promise.all([axios.get(`http://localhost:9000/api/reviews/${id}/comments`)])
      .then(([listComment]) => {
        setListComment(listComment.data);
      })
      .catch((err) => console.log(err));
    dispatch(action.setIdReview(id));
  };
  const writeReview = () => {
    console.log(params);
    func.scrollTop();
    setShowWriteReview(true);
    func.disableScrolling();
  };
  const exitWriteReview = () => {
    setShowWriteReview(false);
    refNewPositive.current.value = "";
    refNewNegative.current.value = "";
    refNewAdvice.current.value = "";
    refPointForSchool.current.value = "";
    func.enableScrolling();
  };
  const saveAddReview = async () => {
    dispatch(
      action.setReview(
        refPositive.current.value,
        refNegative.current.value,
        refAdvice.current.value
      )
    );
    await axios.post(`http://localhost:9000/api/reviews/anonymous`, {
      idSchool: idSchool,
      name: "Fakee",
      positive: refNewPositive.current.value,
      negative: refNewNegative.current.value,
      advice: refNewAdvice.current.value,
      ratePoint: refPointForSchool.current.value,
    });
    setSuccess(success + 1);
    setShowWriteReview(false);
  };
  const goDetailReview = (id, positive, negative, advice, name, createdAt) => {
    dispatch(
      action.setDetailReview(id, positive, negative, advice, name, createdAt)
    );
    func.scrollTop();
  };
  // useEffect(() => {
  //   console.log(window.scrollX);
  // }, [window.scrollX]);
  return loading ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "500px" }}
    >
      <Loading />
    </div>
  ) : (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ width: "100%" }}
    >
      <div className="up-page" onClick={() => func.scrollTop()}>
        <i
          style={{ fontSize: "22px", color: "#7878da" }}
          className="fas fa-angle-double-up"
        ></i>
      </div>
      <div className={`${!showEdit ? "hidden" : "cover-background"}`}></div>
      <div
        className={`${!showWriteReview ? "hidden" : "cover-background"}`}
      ></div>
      <div style={!showEdit ? { display: "none" } : {}} className="editor">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="big-title">Editor</span>
          <i
            onClick={exitEdit}
            class="fas fa-times"
            style={{ cursor: "pointer" }}
          ></i>
        </div>
        <div>
          <div>
            <rb.Card.Text className="review-title">Ưu điểm</rb.Card.Text>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              ref={refPositive}
              className="edit-content"
            />
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Điểm cần cải thiện
            </rb.Card.Text>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              ref={refNegative}
              className="edit-content"
            />
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Trải nghiệm và lời khuyên
            </rb.Card.Text>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              ref={refAdvice}
              className="edit-content"
            />
          </div>
          <rb.Button onClick={saveEdit}>Save</rb.Button>
        </div>
      </div>
      <div
        style={!showWriteReview ? { display: "none" } : {}}
        className="editor"
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="big-title">Write new review</span>
          <i
            onClick={exitWriteReview}
            class="fas fa-times"
            style={{ cursor: "pointer" }}
          ></i>
        </div>
        <div>
          <div>
            <rb.Card.Text className="review-title">Điểm</rb.Card.Text>
            <input
              type="number"
              ref={refPointForSchool}
              className="edit-content"
            />
          </div>
          <div>
            <rb.Card.Text className="review-title">Ưu điểm</rb.Card.Text>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              ref={refNewPositive}
              className="edit-content"
            />
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Điểm cần cải thiện
            </rb.Card.Text>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              ref={refNewNegative}
              className="edit-content"
            />
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Trải nghiệm và lời khuyên
            </rb.Card.Text>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              ref={refNewAdvice}
              className="edit-content"
            />
          </div>
          <rb.Button onClick={saveAddReview}>Save</rb.Button>
        </div>
      </div>
      <div>
        <div className="d-flex flex-column align-items-center">
          <span className="big-title">{school.name}</span>
          <a
            href={school.website}
            style={{ color: "#9696ff" }}
            className="small-title"
          >
            {school.website}
          </a>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <rb.Button onClick={writeReview}>Viết đánh giá</rb.Button>
      </div>
      <div
        style={{ width: "100%" }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        {listReview.map((item, index) => (
          <rb.Card
            className="hover-shadow user"
            key={index}
            style={{ width: "70%", margin: "16px 0", padding: "20px" }}
          >
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <div className="icon-user d-flex align-items-center justify-content-center">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <rb.Card.Text className="review-name ">
                    {item.name}
                  </rb.Card.Text>
                  <Moment className="date-content" format="YYYY/MM/DD">
                    {item.createdAt}
                  </Moment>
                </div>
              </div>
              <div className="d-flex">
                <div
                  className="edit-review"
                  onClick={() => editReview(item._id)}
                >
                  <i className="far fa-edit"></i>
                </div>
                <Link
                  onClick={() =>
                    goDetailReview(
                      item._id,
                      item.positive,
                      item.negative,
                      item.advice,
                      item.name,
                      item.createdAt
                    )
                  }
                  to={`/schools/${params.id}/reviews/${item._id}/detail`}
                  className="edit-review"
                  style={{ marginLeft: "8px", textDecoration: "none" }}
                >
                  <i className="fas fa-expand-arrows-alt"></i>
                </Link>
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
                {item.negative || ""}
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
            <div id={item._id}>
              <ListComment
                listComment={listComment}
                setListComment={setListComment}
                id={item._id}
              ></ListComment>
            </div>
          </rb.Card>
        ))}
      </div>
    </div>
  );
};

export default ListReview;
