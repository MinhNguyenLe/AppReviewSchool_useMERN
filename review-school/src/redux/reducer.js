const INITIAL_STATE = {
  idSchool: "",
  idReview: "",
  positive: '',
  negative: '',
  advice: '',
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
        positive: action.positive,
        negative: action.negative,
        advice: action.advice,
      }
    default:
      return state;
  }
}
