import { useContext } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";

import './App.css';
import Navbar from "./components/Navbar/Navbar";

function App() {
  const {user}=useContext(AuthContext)
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          {user ? <Home/> : <Register/>}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/"/> :<Login/>}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/"/> :<Register/>}
        </Route>
        <Route path="/forget">
          {user ? <Redirect to="/"/> :<ForgetPassword/>}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
