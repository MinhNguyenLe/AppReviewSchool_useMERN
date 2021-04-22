import "./App.css";
import { Route, Switch} from "react-router-dom";
import Review from "./pages/Review.js"
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/review/nameSchool" component={Review}></Route>
      </Switch>
      <Footer></Footer>
    </div>  
  );
}

export default App;
