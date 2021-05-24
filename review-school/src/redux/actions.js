export const setIdSchool = (id) => {
  return {
    type: "SET-ID-SCHOOL",
    payload: {
      id: id,
    },
  };
};

export const setIdReview = (id) => {
  return {
    type: "SET-ID-REVIEW",
    payload: {
      id: id,
    },
  };
};

export const setReview = (positive,negative,advice) => {
  return {
    type: "SET-REVIEW",
    payload: {
      positive: positive,
      negative: negative,
      advice: advice,
    },
  };
};
