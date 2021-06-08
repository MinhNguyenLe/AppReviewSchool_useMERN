import $ from "jquery";

export const scrollTop = () => {
  $("html, body").animate({ scrollTop: "0px" }, 0);
};
export const disableScrolling = () => {
  $("body").addClass("stop-scrolling");
};

export const enableScrolling = () => {
  $("body").removeClass("stop-scrolling");
};
