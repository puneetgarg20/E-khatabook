import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import{BrowserRouter as Router,Routes,Route,Switch,Link} from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { StateContextProvider } from './context/state-context';

import {Login} from './components/Login';
import {Register} from './components/Register';
import { Loggedin } from './components/Loggedin';
import {App} from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateContextProvider>
      <Router>
       
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/logged" element={<Loggedin/>}></Route>
          <Route path="/" element={<Loggedin/>}></Route>
        </Routes>
        
    </Router>
    </StateContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
