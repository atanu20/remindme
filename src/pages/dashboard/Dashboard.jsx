import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { apilink } from '../../data/fdata';
import './Dashboard.css';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';

const Dashboard = () => {
  const atokon = Cookies.get('_pigion_access_user_tokon_');
  const [userInfo, setUserInfo] = useState([]);
  const [msgInfo, setMsgInfo] = useState([]);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [timee, setTimee] = useState('');
  const [datee, setDatee] = useState('');

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const history = useHistory();

  const onSub = async (e) => {
    e.preventDefault();
    setLoading(true);

    const date1 = new Date();
    const date2 = new Date(datee + ' ' + timee);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      setStatus(true);
      setMsg('Choose correct Date and time');
    } else {
      const obj = {
        userId: userInfo._id,
        userName: userInfo.name,
        email: userInfo.email,
        title,
        message,
        sendTime: new Date(datee + ' ' + timee),
        isStatus: false,
      };
      // console.log(obj);
      const res = await axios.post(`${apilink}/user/postMsg`, obj, {
        headers: {
          Authorization: atokon,
        },
      });

      if (res.data.success) {
        // console.log(res.data);/
        setDatee('');
        setMessage('');
        setTimee('');
        setTitle('');
        setStatus(true);
        setMsg(res.data.msg);
        getData();
      } else {
        setStatus(true);
        setMsg(res.data.msg);
      }
    }

    setLoading(false);
  };

  useEffect(async () => {
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (!res.data.success) {
      history.push('/login');
    } else {
      setUserInfo(res.data.userInfo);

      getData();
    }
  }, []);

  const getData = async () => {
    const res = await axios.get(`${apilink}/user/getAllMsgs`, {
      headers: {
        Authorization: atokon,
      },
    });
    if (res.data.success) {
      setMsgInfo(res.data.msgs);
    } else {
      setMsgInfo([]);
    }
  };
  //   console.log(userInfo);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal"
          >
            + Add Msg
          </button>
          <div class="modal fade" id="myModal">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">
                    Hi{' '}
                    <span className="text-warning">
                      {userInfo.name ? userInfo.name : 'User'}{' '}
                    </span>{' '}
                    Add Your Text
                  </h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div class="modal-body">
                  {status ? (
                    <>
                      <div class="alert alert-warning alert-dismissible">
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          onClick={() => setStatus(false)}
                        >
                          &times;
                        </button>
                        {msg}
                      </div>
                    </>
                  ) : null}
                  <form onSubmit={onSub} className="">
                    <div class="form-group">
                      <input
                        type="title"
                        placeholder="Enter Title"
                        class="form-control"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="3"
                        placeholder="Write Message"
                        id=""
                        required
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <input
                          type="date"
                          placeholder="Enter FirstName"
                          className="form-control"
                          name="date"
                          value={datee}
                          onChange={(e) => setDatee(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          type="time"
                          placeholder="Enter LastName"
                          className="form-control"
                          name="time"
                          value={timee}
                          onChange={(e) => setTimee(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className={
                          loading ? 'dis btn btn-primary' : 'btn btn-primary'
                        }
                        disabled={loading}
                      >
                        Add Msg
                      </button>
                    </div>
                    {loading && (
                      <div className="text-center p-2">
                        <CircularProgress size={45} />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          {msgInfo.length > 0 ? (
            <>
              {msgInfo.map((val, ind) => {
                return (
                  <div className="col-10 mx-auto mb-3" key={ind}>
                    <div className="boxcard card">
                      <p>{val.title && val.title} </p>
                      <p>
                        {val.sendTime &&
                          new Date(val.sendTime).toLocaleDateString()}{' '}
                      </p>
                      {!val.isStatus ? (
                        <>
                          <button className="btn btn-danger">Upcoming</button>
                        </>
                      ) : (
                        <button className="btn btn-success">Done</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <h5>No Data</h5>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
