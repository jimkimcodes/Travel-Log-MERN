import React, { useState, useEffect } from 'react';
import Container from './CenterContainer';
import { listLogEntries, getUser } from './api/api';
import { logoutUser, deleteUser } from './api/auth';
import { useHistory } from 'react-router-dom';

export default function UserInfo() {
  const [logEntries, setLogEntries] = useState([]);
  const [user, setUser] = useState({});
  let history = useHistory();

  const logout = () => {
    logoutUser();
    history.push("/login");
  }

  const deleteUserClient = () => {
    if(window.confirm("Are you sure you want to delete your account? We're sorry to see you go.😿")){
      deleteUser();
      history.push('/login');
    }
  }

  const getUserLogs = async () => {
    const user = await getUser();
    if (!user) {
      history.push('/login');
    }
    setUser(user);
    const logEntries = await listLogEntries();
    if (!logEntries) {
      history.push('/login');
    }
    setLogEntries(logEntries.entries);
  }

  useEffect(() => {
    getUserLogs();
  }, []);

  return (
    <Container>
      <h3 className="title is-3 has-text-link	has-text-centered mb-2">Hola, <span className="has-text-danger is-capitalized">{user.username}</span></h3>
      <p className="has-text-black-ter has-text-centered">Welcome back to <span className="has-text-danger">Pinly!</span> A place where you can <span className="has-text-danger">pin your memories now</span> and <span className="has-text-danger">cherish later!</span></p>
      <p className="has-text-info has-text-centered"><small>Double tap anywhere on the map to create a Pin. Click on the Pin to view!</small></p>
      <hr style={{ borderTop: '1px solid #bfbfbf', marginBottom: '0.6rem' }}/>
      <div className="columns">
        <div className="column has-text-centered is-size-5">
          <strong className="">Username:</strong> {user.username} <br/>
          <strong className="">Email:</strong> {user.email} <br/>
          <div className="panel mt-3 is-info">
            <p className="panel-heading">Your Recent Pin entries</p>
            <div className="panel-content" style={{ maxHeight: '200px', overflow: 'auto' }}>
              <div className="panel-block is-flex pr-6">
                <strong className="has-text-danger">Pin Title</strong>
                <strong className="has-text-danger" style={{marginLeft: 'auto'}}>Visit Date</strong>
              </div>
              {
                logEntries.sort((a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
                  let comparison = 0;
                  if (dateA < dateB) comparison = 1;
                  else if (dateA > dateB) comparison = -1;
                  return comparison;                  
                }).map((entry) => (
                  <div className="panel-block has-text-left">
                    <strong className="has-text-info">{entry.title}</strong>
                    <span className="has-text-right" style={{marginLeft: 'auto'}}>{new Date(entry.visitDate).toLocaleString('en-GB')}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <hr style={{ borderTop: '1px solid #bfbfbf', marginBottom: '0.6rem' }}/>
      <div className="has-text-centered">
        <button onClick={logout} className="button is-dark mt-3 mr-5">Log Out</button>
        <button onClick={deleteUserClient} className="button is-dark mt-3 mr-5">Delete My Account</button>
      </div>
    </Container>
  )
}
