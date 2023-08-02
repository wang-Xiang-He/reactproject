import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
// core styles
import "./scss/volt.scss";
// vendor styles
import "react-datetime/css/react-datetime.css";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from './AuthContext'; // 引入 AuthProvider

ReactDOM.render(
  <AuthProvider>
    <HashRouter>
      {/* 其他組件 */}
      {/* <ScrollToTop/> */}
      <HomePage/>
    </HashRouter>
  </AuthProvider>,
  document.getElementById('root')
);
