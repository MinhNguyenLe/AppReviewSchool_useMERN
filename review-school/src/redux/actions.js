export const setIdSchool = (id) => {
  return {
    type: "SET-ID-SCHOOL",
    payload: {
      id: id,
    },
  };
};

export const setUser = (user) => {
  return {
    type: "SET-USER",
    payload: {
      email: user.email,
      permission: user.permission,
      id: user._id,
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
    },
  };
};

export const setEmail = (email) => {
  return {
    type: "SET-EMAIL",
    payload: {
      email: email,
    },
  };
};

export const setToken = (bool) => {
  return {
    type: "SET-TOKEN",
    payload: {
      token: bool,
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

export const setReview = (positive, negative, advice) => {
  return {
    type: "SET-REVIEW",
    payload: {
      positive: positive,
      negative: negative,
      advice: advice,
    },
  };
};

export const setDetailReview = (
  idReview,
  positive,
  negative,
  advice,
  name,
  createdAt
) => {
  return {
    type: "SET-DETAIL-REVIEW",
    payload: {
      idReview: idReview,
      positive: positive,
      negative: negative,
      advice: advice,
      name: name,
      createdAt: createdAt,
    },
  };
};
