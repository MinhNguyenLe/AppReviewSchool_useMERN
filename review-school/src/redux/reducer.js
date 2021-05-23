const INITIAL_STATE = {
  idSchool: "",
  idReview: "",
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
    default:
      return state;
  }
}
