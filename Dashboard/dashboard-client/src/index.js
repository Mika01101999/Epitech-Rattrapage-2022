import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from  "./LoginPage";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Error404 from "./404";
import GoogleCalendar from "./service/Gmail";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="gmail" element={<GoogleCalendar />} />
        <Route path='*' exact="true" element={<Error404 />} />
      </Routes>
    </BrowserRouter>, 
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
