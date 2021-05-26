import $ from 'jquery'

export function scrollTop(){
  $('html, body').animate({ scrollTop: '0px' }, 0)
}
export function disableScrolling(){
  var x=window.scrollX;
  var y=window.scrollY;
  window.onscroll=function(){window.scrollTo(x, y);};
}

export function enableScrolling(){
  window.onscroll=function(){};
}