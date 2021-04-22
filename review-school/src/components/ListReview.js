import React from 'react';
import * as rb  from 'react-bootstrap';
import "./ListReview.css";

const ListReview =()=>{
  return(
    <div>
      <rb.Card>
        <div className="d-flex flex-row align-items-center">
          <div className="icon-user d-flex align-items-center justify-content-center"> 
            <i class="fas fa-user"></i>
            </div>
          <div>
            <rb.Card.Text>Người dùng OurApp</rb.Card.Text>
            <rb.Card.Text>Ngày 20-04-2021</rb.Card.Text>
          </div>
        </div>
        <rb.Card.Text className="review-name-school">Ngoại Thương _ Clc Tiếng Anh</rb.Card.Text>
        <rb.Card.Text className="review-content">Đã học khoá học: Ngoại Thương tại đây.</rb.Card.Text>
        <div>
          <rb.Card.Text className="review-title">Ưu điểm</rb.Card.Text>
          <rb.Card.Text className="review-content">-Cơ sở vật chất rất tốt, hiện đại. Âm thanh, ánh sáng, wifi, không gian học tập phù hợp với nhu cầu sinh viên. Khi gặp vấn đề kỹ thuật luôn có đội ngũ nhân viên hỗ trợ kịp thời</rb.Card.Text>
          <rb.Card.Text className="review-content">-Giảng viên ở các môn chuyên ngành có nhiều kinh nghiệm, luôn cập nhật kiến thức mới và cách giảng dạy cho phù hợp với nhu cầu sinh viên</rb.Card.Text>
        </div>
        <div>
          <rb.Card.Text className="review-title">Điểm cần cải thiện</rb.Card.Text>
          <rb.Card.Text className="review-content">-Một vài giảng viên ở các môn đại cương có thể tăng cường các hoạt động tương tác, kết hợp giữa việc tự học và giảng giải tại lớp song song để đem lại trải nghiệm tốt nhất thay vì việc giảng dạy chỉ đến từ 1 phía</rb.Card.Text>
        </div>
        <div>
          <rb.Card.Text className="review-title">Trải nghiệm và lời khuyên</rb.Card.Text>
          <rb.Card.Text className="review-content">-Bạn cần phải có tinh thần tự học cao, luôn tìm hiểu cái mới. Đọc tin tức, sách báo nhiều hơn để phù hợp với tính chất ngành học</rb.Card.Text>
        </div>
        </rb.Card>
    </div>
  )
}

export default ListReview