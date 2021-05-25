import React from 'react';
import * as rb  from 'react-bootstrap';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import $ from 'jquery';
import 'bootstrap';

const WriteReview =()=>{
  const onChange =()=>{
    console.log(1)
  }
  return(
    <div>
      <ReactSummernote
      value="Default value"
      options={{
        lang: 'ru-RU',
        height: 350,
        dialogsInBody: true,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['fontname', ['fontname']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview']]
        ]
      }}
      onChange={onChange}
      ></ReactSummernote>
    </div>
  )
}

export default WriteReview