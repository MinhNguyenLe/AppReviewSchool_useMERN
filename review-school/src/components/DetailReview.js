import React, { useState, useEffect } from "react";
import * as rb from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as func from "../funcGlobal.js";
import { setReview } from "../redux/actions.js";
import axios from "axios";
import Loading from "./Loading.js";
import "./DetailReview.css";
import Scores from "./Scores.js";
import ListComment from "./ListComment.js";
import { apiLocal } from "../dataGlobal.js";
const DetailReview = () => {
  const listCmt = useSelector((state) => state.cmt);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({});
  const params = useParams();
  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`${apiLocal}/api/reviews/${params.id}`)])
        .then(([review, comment]) => {
          setReview(review.data);
          setLoading(false);
        })
        .catch();
    };
    axiosData();
  }, [params.id]);
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
      style={{ width: "100%", margin: "100px 0 0 0" }}
    >
      <div
        style={{ width: "70%" }}
        className="d-flex flex-row align-items-center justify-content-center"
      >
        <Scores></Scores>
        <rb.Card
          className="f-de-re"
          style={{ margin: "16px 0", padding: "20px" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div className="icon-user d-flex align-items-center justify-content-center">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <rb.Card.Text className="review-name ">
                  {review.name || "anonymous"}
                </rb.Card.Text>
                <Moment className="date-content" format="YYYY/MM/DD">
                  {review.createdAt}
                </Moment>
              </div>
            </div>
            <div className="d-flex">
              <Link
                to={`/schools/${review.idSchool}/reviews`}
                className="edit-review"
                onClick={() => {
                  func.scrollTop();
                }}
              >
                All review
              </Link>
            </div>
          </div>
          <div
            style={{
              marginTop: "40px",
              borderTop: "1px solid rgb(184, 184, 184)",
            }}
          >
            <rb.Card.Text style={{ color: "#00a70d" }} className="review-title">
              Ưu điểm
            </rb.Card.Text>
            <rb.Card.Text className="review-detail-content">
              {review.positive || "trống"}
            </rb.Card.Text>
          </div>
          <div>
            <rb.Card.Text style={{ color: "#d80011" }} className="review-title">
              Điểm cần cải thiện
            </rb.Card.Text>
            <rb.Card.Text className="review-detail-content">
              {review.negative || "trống"}
            </rb.Card.Text>
          </div>
          <div
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid rgb(184, 184, 184)",
            }}
          >
            <rb.Card.Text style={{ color: "#aaac00" }} className="review-title">
              Trải nghiệm và lời khuyên
            </rb.Card.Text>
            <rb.Card.Text className="review-detail-content">
              {review.advice || "trống"}
            </rb.Card.Text>
          </div>
        </rb.Card>
      </div>
      <div style={{ width: "70%", marginBottom: "80px" }}>
        <div
          className="n-cmt"
          style={{
            paddingBottom: "8px",
            width: "100%",
          }}
        >
          {listCmt.length} comments
        </div>
        {<ListComment></ListComment>}
      </div>
    </div>
  );
};

export default DetailReview;
