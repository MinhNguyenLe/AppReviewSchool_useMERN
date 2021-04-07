import "./App.css";
import { Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Footer></Footer>
    </div>  
  );
}

export default App;
