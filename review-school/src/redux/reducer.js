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

const getData =()=> async(dispatch, getState)=>{
  const cmt = getState().cmt
  await fetch('http://localhost:4000/cmt',{
    method : "POST",
    headers :{
    },
    body : JSON.stringify(cmt)
  },
  )
  alert("success")
}