import "./App.css";
import { Route, Switch} from "react-router-dom";
import Review from "./pages/Review.js"
import Navbar from "./components/Navbar.js"
import ListSchool from "./components/ListSchool.js" 
import FilterType1 from "./components/FilterType1.js"
import ListReview from "./components/ListReview.js"
import WriteReview from "./components/WriteReview.js"
import Footer from "./components/Footer.js"
import Logo from "./components/Logo.js"
import 'bootstrap/dist/css/bootstrap.min.css'
import Captcha from "./components/Captcha"

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="frame">
        <div className="frame-width">
          <FilterType1></FilterType1>
          <ListSchool></ListSchool>
          <ListReview></ListReview>
          <WriteReview></WriteReview>
          <Logo></Logo>
          <Switch>
            <Route exact path="/review/nameSchool" component={Review}></Route>
            <Route exact path="/list-school" component={ListSchool}></Route>
            <Route exact path="/list-review" component={ListReview}></Route>
          </Switch>
        </div>
      </div>
      <Footer></Footer>
    </div>  
  );
}

export default App;
