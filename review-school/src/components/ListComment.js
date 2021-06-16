import React, { useEffect, useState, useRef } from "react";
import * as rb from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as action from "../redux/actions.js";
import "./ListComment.css";
import * as func from "../funcGlobal.js";
import Scores from "./Scores.js";
import Moment from "react-moment";
import "moment-timezone";
import $ from "jquery";
import { useParams } from "react-router-dom";

const ListComment = ({ id, setListCmt, listCmt }) => {
  const params = useParams();
  const refCmt = useRef();

  const name = useSelector((state) => state.user.name);

  const dispatch = useDispatch();

  const [addCmt, setAddCmt] = useState(0);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([
        axios.get(`http://localhost:9000/api/reviews/${params.id}/comments`),
      ])
        .then(([listCmt]) => {
          setListCmt(listCmt.data);
        })
        .catch((err) => console.log(err));
    };
    axiosData();
    refCmt.current.value = "";
  }, [addCmt]);

  const submitCmt = async (e) => {
    console.log(params);
    e.preventDefault();
    await axios.post(`http://localhost:9000/api/comments`, {
      idReview: params.id,
      content: refCmt.current.value,
      name: name || "anonymous",
    });
    setAddCmt(addCmt + 1);
  };
  return (
    <div>
      <div
        style={{
          marginTop: "20px",
          borderBottom: "1px solid rgb(223, 222, 222)",
        }}
      >
        <button onClick={() => $("#writeCmt").toggle()} className="btn-add-cmt">
          Add a comment
        </button>
        <rb.Form
          id="writeCmt"
          onSubmit={submitCmt}
          style={{ marginTop: "8px", display: "none" }}
        >
          <rb.Form.Control
            ref={refCmt}
            onClick={() => dispatch(action.setIdReview(id))}
            type="text"
            style={{ width: "100%", fontSize: "18px" }}
          />
        </rb.Form>
      </div>
      <div className="ske-cmt">
        {listCmt.map((item, index) => (
          <div key={index} className="d-flex flex-row ske-cmt-c">
            <div>
              <Moment
                className="date-content"
                format="YYYY/MM/DD"
                style={{ marginRight: "20px" }}
              >
                {item.createdAt}
              </Moment>
              <span className="cmt-name">{item.name || "anonymous"}</span>
              <span className="cmt-content">{item.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComment;
