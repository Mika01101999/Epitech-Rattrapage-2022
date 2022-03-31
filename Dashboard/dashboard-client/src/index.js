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
import About from "./About"
import GoogleCalendar from "./service/Gmail";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about.json" element={<About />} />
        <Route path="gmail" element={<GoogleCalendar />} />
        <Route path='*' exact="true" element={<Error404 />} />
      </Routes>
    </BrowserRouter>, 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
