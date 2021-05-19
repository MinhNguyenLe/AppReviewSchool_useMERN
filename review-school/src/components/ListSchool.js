import React,{useEffect,useState} from 'react';
import * as rb  from 'react-bootstrap';
import "./ListSchool.css";
import axios from 'axios';

const ListSchool =()=>{
  const [data, setData] = useState([]);

  useEffect(() => {
    const axiosData = async () => {
      const result = await axios.get(
        'http://localhost:9000/api/schools',
      );
      setData(result.data);
    };
    axiosData();
  }, []); 

  return(
    <div>
    {data.map((item,index) => (
      <rb.Card key={index} >
        <rb.Card.Link href="/review/nameSchool" className="d-flex flex-row">
          <rb.Card.Img src={item.images[0]} className="school-img"></rb.Card.Img>
          <rb.Card.Body>
              <rb.Card.Text className="school-name">{item.name}-{item.code}</rb.Card.Text>
              <rb.Card.Text className="school-name">{item.location}</rb.Card.Text>
              <div className="d-flex flex-row align-items-center">
              <rb.Badge variant="success" className="d-flex justify-content-center align-items-center school-badge">9.0</rb.Badge>
              <div>
              <rb.Card.Text className="school-name">Tốt</rb.Card.Text>
              <rb.Card.Text>n đánh giá</rb.Card.Text>
              </div>
              </div>
              </rb.Card.Body>
              </rb.Card.Link>
              </rb.Card>
    ))}
    </div>
  )
}

export default ListSchool