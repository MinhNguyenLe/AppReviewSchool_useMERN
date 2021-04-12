import "./App.css";
import { Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"

import {Button} from 'react-bootstrap';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Button>Test</Button>
      <Footer></Footer>
    </div>  
  );
}

export default App;
