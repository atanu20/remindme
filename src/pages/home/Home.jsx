import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import './Home.css';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-lg-1 order-md-1 order-2 col-md-6 col-12 leftside mx-auto ">
              <h1>Remind me, Please</h1>
              <h4>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
                maxime!
              </h4>
            </div>
            <div className="col-lg-6 order-lg-2 order-md-2 order-1 col-md-6 col-12 leftside mx-auto">
              <img src="image/remind.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
