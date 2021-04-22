import React from 'react';
import {Button} from 'react-bootstrap';
import {useSelector, useDispatch, connect} from 'react-redux'

const Review =()=>{
  const dispatch = useDispatch();
  const sumCmt = useSelector(state => state.cmt).length

  return(
    <div>
      <Button>Review</Button>
    </div>
  )
}

export default Review