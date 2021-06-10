import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login.js";
import Register from "./components/Register.js";
import Navbar from "./components/Navbar.js";
import ListSchool from "./components/ListSchool.js";
import DetailReview from "./components/DetailReview.js";
import ListReview from "./components/ListReview.js";
import Footer from "./components/Footer.js";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Login}></Route>
        <Route exact path="/schools" component={ListSchool}></Route>
        <Route
          exact
          path="/schools/:id/reviews/:id/detail"
          component={DetailReview}
        ></Route>
        <Route exact path="/schools/:id/reviews" component={ListReview}></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
};

export default App;
