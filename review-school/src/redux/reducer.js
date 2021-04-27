let lastId =0 ;

export default function reducer(state =[] , action){
  switch(action.type){
    case "BUG_INPUT":
      return [
        ...state,
        {
          id : ++lastId,
          description : action.payload.description ,
          resolved : false
        }
      ] 
    case "debug":
      return state.map(data => data.resolved = true)
    default: return state;
  }
}

export const getData =()=> async(dispatch, getState)=>{
  const listReview = getState().listReview
  await fetch('http://localhost:9000/api/reviews/',{
    method : "GET",
    headers :{
    },
    body : JSON.stringify(listReview)
  },
  )
  alert("success")
}