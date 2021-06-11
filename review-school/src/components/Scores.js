import React from "react";

const Scores = () => {
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex align-items-center justify-content-center">
          <i className="fas fa-caret-up" style={{ fontSize: "32px" }}></i>
        </div>
        <span className="rate-re">300</span>
        <div className="d-flex align-items-center justify-content-center">
          <i className="fas fa-sort-down" style={{ fontSize: "32px" }}></i>
        </div>
      </div>
    </div>
  );
};

export default Scores;
