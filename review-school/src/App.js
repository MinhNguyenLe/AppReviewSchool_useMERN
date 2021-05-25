import "./App.css";
import { Route, Switch } from "react-router-dom";
import Review from "./pages/Review.js";
import Navbar from "./components/Navbar.js";
import ListSchool from "./components/ListSchool.js";
import FilterType1 from "./components/FilterType1.js";
import ListReview from "./components/ListReview.js";
import Footer from "./components/Footer.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/list-school" component={ListSchool}></Route>
        <Route exact path="/schools/:id/reviews" component={ListReview}></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
