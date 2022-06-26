import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Error from './pages/Error';

import './App.css';
// import Navbar from './component/navbar/NavBar';
import NavOne from './component/navbar/NavOne';
import LoginU from './pages/auth/LoginU';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <>
      <NavOne />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={LoginU} />
        <Route exact path="/dashboard" component={Dashboard} />

        <Route component={Error} />
      </Switch>
    </>
  );
};

export default App;
