import React from 'react'
import "./Footer.css";
import $ from 'jquery';

const Footer =()=>{

  const hideErrorMessage =()=>{
    $('.fill-none').hide();
    $('.wrong-format').hide();
  }
  const SubEmail=()=>{
    if($('.footer-body-sub-input').val() === ''){
      hideErrorMessage();
      $('.fill-none').show();
    }
    if($('.footer-body-sub-input').val() !== ''){
      hideErrorMessage();
      $('.wrong-format').show();
    }
  }
  const fillEmail =()=>{
    hideErrorMessage();
  }
  return(
    <div className="">
      <div className="footer-head-frame">
        <div className="footer-head">
          <div className="footer-head-child">
            <i className="fas fa-hotel"></i>
            <div>
              <span>+14,800 thông tin khóa học</span>
              <span>... and we're counting :D</span>
            </div>
          </div>
          <div className="footer-head-child">
            <i className="fas fa-check"></i>
            <div>
              <span>+40,000 đánh giá từ học viên</span>
              <span>More and more</span>
            </div>
          </div>
          <div className="footer-head-child">
            <i className="fas fa-phone-volume"></i>
            <div>
              <span>+53,100 kết nối học viên</span>
              <span>We're waiting for your call</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-body-frame">
        <div className="footer-body">
          <div className="footer-body-head">
            <img src="https://cdn.airpaz.com/nuxt/img/en.f5276dd.png" className="footer-body-bigimg"></img>
            <div className="footer-body-head-app">
              <h2>Tải ứng dụng của chúng tôi
              <br></br>Review mọi lúc mọi nơi</h2>
              <div className="footer-body-app">
                <a href="">
                  <img src="https://cdn.airpaz.com/nuxt/img/playstore.c68e1c2.svg"></img>
                </a>
                <a href="">
                  <img src="https://cdn.airpaz.com/nuxt/img/appstore.e374ae7.svg"></img>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-body-sub">
            <div className="footer-body-sub-topic">
              <span>Please fill Email-address</span>
              <span>And check your mail now.</span>
            </div>
            <input placeholder="Your E-mail" onInput={fillEmail} className="footer-body-sub-input"></input>
            <button className="footer-body-sub-btn" onClick={SubEmail}>SUBMIT</button>
            <div className="footer-body-sub-error  fill-none">
              <i className="fas fa-exclamation-triangle"></i>
              <span className="footer-body-sub-error-content">Please fill email</span>
            </div>
            <div className="footer-body-sub-error wrong-format">
              <i className="fas fa-exclamation-triangle"></i>
              <span className="footer-body-sub-error-content">Wrong "Email" format</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-footer-frame">
        <div className="footer-footer">
          <div className="footer-footer-child">
            <span className="footer-footer-topic">OUR APP</span>
            <div className="footer-footer-topic-text">
              <a href="">Home</a>
              <a href="">About Us</a>
              <a href="">Promo</a>
              <a href="">Airline information</a>
              <a href="">All Flights</a>
            </div>
          </div>
          <div className="footer-footer-child">
            <span className="footer-footer-topic">Attend with us</span>
            <div div className="footer-footer-topic-text">
              <a href="">Sign Up</a>
              <a href="" >Forgot Password</a>
            </div>
          </div>
          <div className="footer-footer-child">
            <span className="footer-footer-topic">Any Question</span>
            <div div className="footer-footer-topic-text">
              <a href="" >FAQ</a>
              <a href="" >Help Center</a>
              <a href="" >Terms Of Use</a>
              <a href="">Terms & Conditions</a>
            </div>
          </div>
          <div className="footer-footer-child">
            <span className="footer-footer-topic">Follow Us</span>
              <div className="footer-footer-topic-follow">
                <a href="" className="footer-footer-topic-follow-fb">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="" className="footer-footer-topic-follow-insta">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div className="footer-footer-topic-follow">
                <a href="" className="footer-footer-topic-follow-yt">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="" className="footer-footer-topic-follow-tw">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
          </div>
          <div className="footer-footer-child footer-footer-child-app">
            <span className="footer-footer-topic">Our app</span>
            <div className="footer-body-app footer-footer-topic-app">
                <a>
                  <img src="https://cdn.airpaz.com/nuxt/img/playstore.c68e1c2.svg"></img>
                </a>
                <a>
                  <img src="https://cdn.airpaz.com/nuxt/img/appstore.e374ae7.svg"></img>
                </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-last-frame">
        <div className="footer-last">
          <span>Copyright 2021 ©REVIEW-SCHOOL.edu. All rights reserved.</span>
          <span>All logos, patents, and trademarks belong to their respective owners</span>
        </div>
      </div>
    </div>
  )
}

export default Footer;