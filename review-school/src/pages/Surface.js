import React from "react";
import "./Surface.css";

const Surface = () => {
  const aStyle = {
    textDecoration: "none",
    color: "#0077cc",
    cursor: "pointer",
  };
  const imgStyle = {
    width: "100%",
    maxWidth: "100%",
    height: "auto",
  };
  return (
    <div>
      <header className="header-surface">
        <div className="nav-container-surface">
          <nav className="nav-surface">
            <div className="nav-brand">
              <div className="hamburger-menu-container-surface">
                <div className="hamburger-menu">
                  <div className="line ft-sz" />
                  <div className="line ft-sz" />
                  <div className="line ft-sz" />
                </div>
                <div className="nav-dropdown-menu">
                  <a style={aStyle} href="#" className="current-link">
                    Home
                  </a>
                  <h5>Public</h5>
                  <ul className="nav-ul">
                    <li className="nav-item">
                      <i className="fas fa-globe-europe" />
                      <a style={aStyle} href="#" className="nav-link ft-sz">
                        Stack Overflow
                      </a>
                    </li>
                    <li className="nav-item">
                      <a style={aStyle} href="#" className="nav-link">
                        Tags
                      </a>
                    </li>
                    <li className="nav-item">
                      <a style={aStyle} href="#" className="nav-link">
                        Users
                      </a>
                    </li>
                  </ul>
                  <h5>Find a Job</h5>
                  <ul className="nav-ul">
                    <li className="nav-item">
                      <a style={aStyle} href="#" className="nav-link">
                        Jobs
                      </a>
                    </li>
                    <li className="nav-item">
                      <a style={aStyle} href="#" className="nav-link">
                        Companies
                      </a>
                    </li>
                  </ul>
                  <h5>
                    Teams{" "}
                    <a style={aStyle} href="#">
                      What's this ?
                    </a>
                  </h5>
                  <a style={aStyle} href="#" className="nav-link">
                    <i className="fas fa-briefcase" />
                    <span>Free 30 Day Trial</span>
                  </a>
                </div>
              </div>
              <a style={aStyle} href="#" className="nav-icon">
                <i className="fab fa-stack-overflow" />
                <div className="nav-icon-text">
                  Edu <span className="nav-bold-text">Review</span>
                </div>
              </a>
            </div>
            <div className="nav-base-links">
              <ul className="ul-n">
                <li>
                  <a className="ft-sz" style={aStyle} href="/schools">
                    Review
                  </a>
                </li>
                <li>
                  <a className="ft-sz" style={aStyle} href="#">
                    Forum
                  </a>
                </li>
                <li>
                  <a className="ft-sz" style={aStyle} href="#">
                    More
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-search">
              <div className="search-container-surface">
                <i className="fas fa-search" />
                <input type="text" id placeholder="Search..." />
              </div>
              <div className="search-hints">
                <div className="search-arrow-up" />
                <div className="search-hint-body">
                  <div className="hints-grid-column">
                    <div className="hint-text">
                      <span>[tag] </span> search within a tag
                    </div>
                    <div className="hint-text">
                      <span>user:1234 </span> search by author
                    </div>
                    <div className="hint-text">
                      <span>"words here"</span> exact phrase{" "}
                    </div>
                  </div>
                  <div className="hints-grid-column">
                    <div className="hint-text">
                      <span>answers:0</span> unanswered questions
                    </div>
                    <div className="hint-text">
                      <span> score:3</span> posts with a 3+ score
                    </div>
                    <div className="hint-text">
                      <span>isaccepted:yes </span> search within status
                    </div>
                  </div>
                </div>
                <div className="search-hint-footer">
                  <a style={aStyle} href="#" className="btn-surface">
                    Ask a question
                  </a>
                  <a style={aStyle} href="#" className="search-help">
                    Search help
                  </a>
                </div>
              </div>
            </div>
            <div className="nav-right-buttons">
              <div className="search-btn-surface">
                <i className="fas fa-search" />
              </div>
              <a href="/login" className="btn-surface btn-surface-login">
                Log in
              </a>
              <a href="/register" className="btn-surface btn-surface-register">
                Sign up
              </a>
            </div>
          </nav>
        </div>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            We <span>&lt;3 </span> people who code
          </h1>
          <p className="hero-paragraph">
            We build products that empower developers and connect them to
            solutions that enable productivity, growth, and discovery.
          </p>
          <div className="hero-options">
            <a
              style={aStyle}
              href="#"
              className="btn-surface btn-surface-developers"
            >
              For developers
            </a>
            <a
              style={aStyle}
              href="#"
              className="btn-surface btn-surface-businesses"
            >
              For businesses
            </a>
          </div>
        </div>
      </section>
      <section className="for-developers">
        <div className="container-surface">
          <div className="section-head">
            <h2 className="section-title">For developers, by developers</h2>
            <div className="section-line" />
            <p className="section-description">
              Education Review is an{" "}
              <a style={aStyle} href="#">
                open community
              </a>{" "}
              for anyone that codes. We help you get answers to your toughest
              coding questions, share knowledge with your coworkers in private,
              and find your next dream job.
            </p>
          </div>
          <div className="options">
            <div className="option">
              <div className="option-icon">
                <img
                  style={imgStyle}
                  src="https://cdn.sstatic.net/Img/home/public-qa.svg?v=d82acaa7df9f"
                  alt="Public Q & A"
                />
              </div>
              <div className="option-title">Public Q&amp;A</div>
              <div className="option-description">
                Get answers to more than 16.5 million questions and give back by
                sharing your knowledge with others.
                <a style={aStyle} href="#">
                  Sign up
                </a>{" "}
                for an account.
              </div>
              <div className="option-button">
                <a
                  style={aStyle}
                  href="#"
                  className="option-link btn-surface btn-surface-dark-blue"
                >
                  Browse questions
                </a>
              </div>
            </div>
            <div className="option">
              <div className="option-icon">
                <img
                  style={imgStyle}
                  src="https://cdn.sstatic.net/Img/home/private-qa.svg?v=2c1de180b6d7"
                  alt="Private Q & A"
                />
              </div>
              <div className="option-title">Public Q&amp;A</div>
              <div className="option-description">
                Level up with Stack Overflow while you work. Share knowledge
                privately with your coworkers using our flagship Q&amp;A engine.
              </div>
              <div className="option-button">
                <a
                  style={aStyle}
                  href="#"
                  className="option-link btn-surface btn-surface-orange"
                >
                  Try for free
                </a>
              </div>
            </div>
            <div className="option">
              <div className="option-icon">
                <img
                  style={imgStyle}
                  src="https://cdn.sstatic.net/Img/home/jobs.svg?v=931d6c0863ee"
                  alt="Browse jobs
"
                />
              </div>
              <div className="option-title">Public Q&amp;A</div>
              <div className="option-description">
                Find the right job through high quality listings and search for
                roles based on title, technology stack, salary, location, and
                more.
              </div>
              <div className="option-button">
                <a
                  style={aStyle}
                  href="#"
                  className="option-link btn-surface btn-surface-dark-blue"
                >
                  Find a job
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="for-businesses">
        <div className="container-surface">
          <div className="section-head">
            <h2 className="section-title">For businesses, by developers</h2>
            <div className="section-line" />
            <p className="section-description">
              Our mission is to help developers write the script of the future.
              This means helping you find and hire skilled developers for your
              business and providing them the tools they need to share knowledge
              and work effectively.
            </p>
          </div>
          <div className="options">
            <div className="option">
              <div className="option-icon">
                <img
                  style={imgStyle}
                  src="https://cdn.sstatic.net/Img/home/private-questions.svg?v=a4f1cfb08f7e"
                  alt="Private Q&A"
                />
              </div>
              <div className="option-description">
                Quickly find and share internal knowledge with{" "}
                <a style={aStyle} href="#" className="option-link">
                  Private Q&amp;A
                </a>
              </div>
            </div>
            <div className="option">
              <div className="option-icon">
                <img
                  style={imgStyle}
                  src="https://cdn.sstatic.net/Img/home/find-candidate.svg?v=9099aa106ad3"
                  alt="Talent solutions"
                />
              </div>
              <div className="option-description">
                Find the perfect candidate for your growing technical team with{" "}
                <a style={aStyle} href="#" className="option-link">
                  Talent solutions
                </a>
              </div>
            </div>
            <div className="option">
              <div className="option-icon">
                <img
                  style={imgStyle}
                  src="https://cdn.sstatic.net/Img/home/accelerate.svg?v=9d4c2786ff02"
                  alt=" Advertising platform"
                />
              </div>
              <div className="option-description">
                Accelerate the discovery of your products or services through
                our{" "}
                <a style={aStyle} href="#" className="option-link">
                  Advertising platform
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="teams">
        <div className="container-surface">
          <div className="teams-head">
            <h2 className="teams-title">
              Unlock siloed knowledge with Stack Overflow for Teams
            </h2>
            <p className="teams-description">
              Wikis, chat messages, or formal documentation for knowledge
              management aren’t effective. Our question and answer format is a
              proven approach for accessing the right information in less time.
            </p>
            <div className="teams-details">
              <a
                style={aStyle}
                href="#"
                className="btn-surface btn-surface-orange"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="teams-plan">
            <div className="card card-basic">
              <div className="card-header">
                <h2 className="plan-type">Basic</h2>
                <p className="plan-description">
                  Private knowledge base for teams
                </p>
              </div>
              <div className="card-body">
                <div className="plan-price">
                  <div className="price">$6 USD</div>
                  <span className="per">per teammate / month</span>
                </div>
                <div className="plan-features">
                  <div className="plan-feature">
                    <i className="far fa-calendar-alt" />
                    <span className="plan-text">Free 30 day trial</span>
                  </div>
                  <div className="plan-feature">
                    <i className="fab fa-keycdn" />
                    <span className="plan-text">
                      Your own private space hosted on stackoverflow.com
                    </span>
                  </div>
                  <div className="plan-feature">
                    <i className="fas fa-archive" />
                    <span className="plan-text">Fully searchable archive</span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <a
                  style={aStyle}
                  href="#"
                  className="btn-surface btn-surface-card"
                >
                  Get started for free
                </a>
              </div>
            </div>
            <div className="card card-business">
              <div className="card-most-used">
                <span>MOST USED</span>
                <i className="fas fa-city" />
              </div>
              <div className="card-header">
                <h2 className="plan-type">Business</h2>
                <p className="plan-description">
                  Private knowledge base with SSO and premium features
                </p>
              </div>
              <div className="card-body">
                <div className="plan-price">
                  <div className="price">$12 USD</div>
                  <span className="per">per teammate / month</span>
                </div>
                <div className="plan-features">
                  <div className="plan-feature">
                    <i className="fas fa-key" />
                    <span className="plan-text">
                      Single sign-on (SSO) with SAML
                    </span>
                  </div>
                  <div className="plan-feature">
                    <i className="far fa-chart-bar" />
                    <span className="plan-text">Reporting and analytics</span>
                  </div>
                  <div className="plan-feature">
                    <i className="fas fa-plus-square" />
                    <span className="plan-text">Priority customer support</span>
                  </div>
                  <div className="plan-feature">
                    <i className="fas fa-star" />
                    <span className="plan-text">99.5% uptime</span>
                  </div>
                  <div className="plan-feature">
                    <i className="fas fa-plus" />
                    <span className="plan-text">
                      All the features of Basic tier
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <a
                  style={aStyle}
                  href="#"
                  className="btn-surface btn-surface-card"
                >
                  Get started
                </a>
              </div>
            </div>
            <div className="card card-enterprise">
              <div className="card-header">
                <h2 className="plan-type">Enterprise</h2>
                <p className="plan-description">
                  Standalone knowledge base with enhanced security and flexible
                  hosting
                </p>
              </div>
              <div className="card-body">
                <div className="plan-price">
                  <div className="price">Custom pricing </div>
                  <span className="per">Let’s talk about what you need</span>
                </div>
                <div className="plan-features">
                  <div className="plan-feature">
                    <i className="fas fa-key" />
                    <span className="plan-text">
                      Single sign-on with AD or SAML
                    </span>
                  </div>
                  <div className="plan-feature">
                    <i className="fas fa-mountain" />
                    <span className="plan-text">
                      Host on your cloud or servers – or our private managed
                      cloud
                    </span>
                  </div>
                  <div className="plan-feature">
                    <i className="fas fa-code" />
                    <span className="plan-text">Robust read and write API</span>
                  </div>
                  <div className="plan-feature">
                    <i className="fas fa-user" />
                    <span className="plan-text">
                      Your own customer success and community building
                      representative
                    </span>
                  </div>
                  <div className="plan-feature">
                    <i className="fas fa-star" />
                    <span className="plan-text">
                      99.5% uptime SLA and priority support
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <a
                  style={aStyle}
                  href="#"
                  className="btn-surface btn-surface-card"
                >
                  Request a demo
                </a>
              </div>
            </div>
          </div>
          <div className="teams-footer">
            <a style={aStyle} className="teams-footer-item">
              <img
                style={imgStyle}
                src="https://cdn.sstatic.net/Img/product/teams/endorsements/g2.svg?v=670bf9279910"
                alt=""
              />
              <div className="teams-footer-text">
                <strong>Leader</strong> <span>Summer 2020</span>{" "}
              </div>
            </a>
            <a style={aStyle} className="teams-footer-item">
              <img
                style={imgStyle}
                src="https://cdn.sstatic.net/Img/product/teams/endorsements/g2.svg?v=670bf9279910"
                alt=""
              />
              <div className="teams-footer-text">
                <strong>Users Love Us</strong>{" "}
              </div>
            </a>
            <a style={aStyle} className="teams-footer-item">
              <img
                style={imgStyle}
                src="https://cdn.sstatic.net/Img/product/teams/endorsements/fastco.svg?v=5ebc802a76c7"
                alt=""
              />
              <div className="teams-footer-text">
                <strong>Most Innovative Companies</strong> <span>2019</span>{" "}
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className="hire">
        <div className="container-surface">
          <div className="hire-content">
            <div className="hire-item">
              <img
                style={imgStyle}
                src="https://cdn.sstatic.net/Img/home/find-candidate.svg?v=9099aa106ad3"
                alt=""
                className="hire-icon"
              />
              <h4 className="hire-item-title">Hire your technical talent</h4>
              <p className="hire-item-description">
                We help expand your technical hiring strategy to promote your
                employer brand and highlight relevant open roles to our
                community of over 100 million developers and technologists.
              </p>
              <a
                style={aStyle}
                href="#"
                className="btn-surface btn-surface-orange"
              >
                Stack Overflow Talent
              </a>
            </div>
            <div className="hire-item">
              <img
                style={imgStyle}
                src="https://cdn.sstatic.net/Img/home/accelerate.svg?v=9d4c2786ff02"
                alt=""
                className="hire-icon"
              />
              <h4 className="hire-item-title">Reach developers worldwide</h4>
              <p className="hire-item-description">
                Use the world’s largest resource for people who code to help you
                increase awareness and showcase your product or service across
                Stack Overflow’s network of Q&amp;A sites.{" "}
              </p>
              <a
                style={aStyle}
                href="#"
                className="btn-surface btn-surface-orange"
              >
                Stack Overflow Advertising
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="questions">
        <div className="container-surface">
          <div className="questions-content">
            <div className="questions-header">
              <h3 className="question-title">
                Questions are everywhere, answers are on Stack Overflow
              </h3>
            </div>
            <div className="questions-body">
              <div className="questions-body-items">
                <div className="questions-body-item" data-id={0}>
                  <img
                    style={imgStyle}
                    src="https://cdn.sstatic.net/Img/home/ask-a-question.svg?v=f4f2050b0297"
                    alt=""
                    className="question-item-icon"
                  />
                  <div className="question-item-text">Ask a question</div>
                  <div className="question-arrow-right" />
                </div>
                <div className="questions-body-item" data-id={1}>
                  <img
                    style={imgStyle}
                    src="https://cdn.sstatic.net/Img/home/votes.svg?v=748a8f48a8e2"
                    alt=""
                    className="question-item-icon"
                  />
                  <div className="question-item-text">Vote on everything</div>
                  <div className="question-arrow-right" />
                </div>
                <div className="questions-body-item" data-id={2}>
                  <img
                    style={imgStyle}
                    src="https://cdn.sstatic.net/Img/home/answer.svg?v=4cd8048a676c"
                    alt=""
                    className="question-item-icon"
                  />
                  <div className="question-item-text">Answer questions</div>
                  <div className="question-arrow-right" />
                </div>
              </div>
              <div className="questions-body-item-content">
                <img
                  style={imgStyle}
                  src="https://cdn.sstatic.net/Img/home/illo-feats-vote.svg?v=9d2eb0efdc17"
                  alt=""
                  className="question-item-content-img"
                />
                <h4 className="question-item-content-text">
                  Accept the answer which solved your problem to let others
                  benefit from the valuable information.
                </h4>
                <a
                  style={aStyle}
                  href="#"
                  className="btn-surface btn-surface-orange question-item-content-btn-surface"
                >
                  Create an account
                </a>
              </div>
              <div className="questions-body-items">
                <div className="questions-body-item" data-id={3}>
                  <img
                    style={imgStyle}
                    src="https://cdn.sstatic.net/Img/home/tags.svg?v=913379eb09eb"
                    alt=""
                    className="question-item-icon"
                  />
                  <div className="question-item-text">Tag your question</div>
                  <div className="question-arrow-left" />
                </div>
                <div className="questions-body-item" data-id={4}>
                  <img
                    style={imgStyle}
                    src="https://cdn.sstatic.net/Img/home/accept.svg?v=27d5be078970"
                    alt=""
                    className="question-item-icon"
                  />
                  <div className="question-item-text">Accept a answer</div>
                  <div className="question-arrow-left" />
                </div>
                <div className="questions-body-item" data-id={5}>
                  <img
                    style={imgStyle}
                    src="https://cdn.sstatic.net/Img/home/get-recognized.svg?v=3b339d9aa10c"
                    alt=""
                    className="question-item-icon"
                  />
                  <div className="question-item-text">Get recognized</div>
                  <div className="question-arrow-left" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="jobs">
        <div className="container-surface"></div>
      </section>
    </div>
  );
};

export default Surface;
