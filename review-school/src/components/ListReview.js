import React,{useEffect,useState} from 'react';
import * as rb  from 'react-bootstrap';
import "./ListReview.css";
import axios from 'axios';

const ListReview =()=>{
  const [data, setData] = useState([]);

  useEffect(() => {
    const axiosData = async () => {
      const result = await axios.get(
        'http://localhost:9000/api/reviews',
      );
      setData(result.data);
    };
    axiosData();
  }, []); 
  return(
    <div>
    {data.map((item,index) => (
      <rb.Card key={index}>
        <div className="d-flex flex-row align-items-center">
          <div className="icon-user d-flex align-items-center justify-content-center"> 
            <i className="fas fa-user"></i>
            </div>
          <div>
            <rb.Card.Text>Người dùng App</rb.Card.Text>
            <rb.Card.Text>{item.createdAt}</rb.Card.Text>
          </div>
        </div>
        <rb.Card.Text className="review-name-school">Ngoại Thương _ Clc Tiếng Anh</rb.Card.Text>
        <rb.Card.Text className="review-content">Đã học khoá học: Ngoại Thương tại đây.</rb.Card.Text>
        <div>
          <rb.Card.Text className="review-title">Ưu điểm</rb.Card.Text>
          <rb.Card.Text className="review-content">-{item.positive}</rb.Card.Text>
        </div>
        <div>
          <rb.Card.Text className="review-title">Điểm cần cải thiện</rb.Card.Text>
          <rb.Card.Text className="review-content">-{item.negative}</rb.Card.Text>
        </div>
        <div>
          <rb.Card.Text className="review-title">Trải nghiệm và lời khuyên</rb.Card.Text>
          <rb.Card.Text className="review-content">-Bạn cần phải có tinh thần tự học cao, luôn tìm hiểu cái mới. Đọc tin tức, sách báo nhiều hơn để phù hợp với tính chất ngành học</rb.Card.Text>
        </div>
        </rb.Card>
    ))}
    </div>
  )
}

export default ListReview