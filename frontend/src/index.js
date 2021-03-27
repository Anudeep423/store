import React from 'react';
import ReactDOM from 'react-dom';
import Signin from './Signin';
import Signup from './Signup';
import Customer from "./Customer"
import Seller from './Seller';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router , Route , Link ,Switch, Redirect } from "react-router-dom"

ReactDOM.render(
  <Router>
    <Switch>
    <Route exact path = "/"   component = {Signin}  />
    <Route exact path = "/signup"   component = {Signup}  />
    <Route exact path = "/customer"  render = { () => localStorage.getItem("JWT") ?  <Customer /> : <Redirect to = "/" />  }  />
    <Route exact path = "/seller"   component = { () => localStorage.getItem("JWT") ?  <Seller /> : <Redirect to = "/" />        }  />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
