const INITIAL_STATE = {
  idSchool: "",
  idReview: "",
  positive: '',
  negative: '',
  advice: '',
  createdAt:'',
  name : ''
};
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET-ID-SCHOOL":
      return {
        ...state,
        idSchool: action.payload.id,
      };
    case "SET-ID-REVIEW":
      return {
        ...state,
        idReview: action.payload.id,
      };
    case "SET-REVIEW":
      return {
        ...state,
        positive: action.payload.positive,
        negative: action.payload.negative,
        advice: action.payload.advice,
      };
    case "SET-DETAIL-REVIEW":
      return {
        ...state,
        idReview: action.payload.id,
        positive: action.payload.positive,
        negative: action.payload.negative,
        advice: action.payload.advice,
        name : action.payload.name,
        createdAt:action.payload.createdAt
      } 
    default:
      return state;
  }
}
