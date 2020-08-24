import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Map from './Map';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import Info from './UserInfo';

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/user" component={Info} />
          <Route path="/" component={Map} />
        </Switch>
        <Footer />
      </div>
    </ Router>
  )
}
