import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login.js";
import Surface from "./pages/Surface.js";
import Register from "./components/Register.js";
import Navbar from "./components/Navbar.js";
import ListSchool from "./components/ListSchool.js";
import DetailReview from "./components/DetailReview.js";
import ListReview from "./components/ListReview.js";
import Footer from "./components/Footer.js";
import ListThread from "./components/ListThread.js";
import NewThread from "./components/NewThread.js"
import ListPost from "./components/ListPost.js"
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Surface}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Login}></Route>
        <Route exact path="/schools" component={ListSchool}>
          <Navbar></Navbar>
          <ListSchool></ListSchool>
          <Footer></Footer>
        </Route>
        <Route exact path="/schools/:id/reviews/:id/detail">
          <Navbar></Navbar>
          <DetailReview></DetailReview>
        </Route>
        <Route exact path="/schools/:id/reviews">
          <Navbar></Navbar>
          <ListReview></ListReview>
          <Footer></Footer>
        </Route>
        <Route exact path="/forum">
          <Navbar></Navbar>
          <ListThread></ListThread>
          <Footer></Footer>
        </Route>
        <Route exact path="/forum/new-thread">
        <Navbar></Navbar>
          <NewThread></NewThread>
          <Footer></Footer>
        </Route>
        <Route exact path="/forum/thread/:id">
          <Navbar></Navbar>
          <ListPost></ListPost>
          <Footer></Footer>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
