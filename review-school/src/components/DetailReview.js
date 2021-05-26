import React,{useState, useEffect} from 'react'
import * as rb from "react-bootstrap";
import Moment from 'react-moment';
import { useSelector } from "react-redux";
import {Link, useParams} from 'react-router-dom'
import * as func from '../funcGlobal.js'
import { setReview } from '../redux/actions.js';
import axios from "axios";
import Loading from './Loading.js'

const DetailReview=()=>{
  const [loading,setLoading] = useState(true)
  const [review,setReview] = useState([])
  const params = useParams()
  useEffect(()=>{
    const axiosData = () => {
      Promise.all([
        axios.get(`http://localhost:9000/api/reviews/${params.id}`),
      ])
        .then(([review]) => {
          setReview(review.data)
          setLoading(false)
        })
        .catch();
    };
    axiosData();
  },[params.id])
  return(
    loading ? 
    <div className="d-flex align-items-center justify-content-center" style={{height : '500px'}}><Loading/></div>
    :
    (
    <div className="d-flex justify-content-center" style={{width : '100%', margin : '40px 0'}}>
      <rb.Card className="hover-shadow user" style={{width : '70%', margin : '16px 0', padding : '20px'}}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div className="icon-user d-flex align-items-center justify-content-center">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <rb.Card.Text className="review-name ">{review.name}</rb.Card.Text>
                <Moment className="date-content" format="YYYY/MM/DD">{review.createdAt}</Moment>
              </div>
            </div>
            <div className="d-flex">
              <Link to={`/schools/${review.idSchool}/reviews`} className="edit-review" onClick={()=>{
                func.scrollTop()
                console.log(review)}}>
                Back
              </Link>
            </div>
          </div>
          <div>
            <rb.Card.Text className="review-title">Ưu điểm</rb.Card.Text>
            <rb.Card.Text className="review-detail-content">
              {review.positive}
            </rb.Card.Text>
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Điểm cần cải thiện
            </rb.Card.Text>
            <rb.Card.Text className="review-detail-content">
              {review.negative}
            </rb.Card.Text>
          </div>
          <div>
            <rb.Card.Text className="review-title">
              Trải nghiệm và lời khuyên
            </rb.Card.Text>
            <rb.Card.Text className="review-detail-content">
              {review.advice}
            </rb.Card.Text>
          </div>
        </rb.Card>
      </div>
    )
  );
}

export default DetailReview;