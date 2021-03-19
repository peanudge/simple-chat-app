import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import "./App.css";

const App = () => {
  return (
    <div className="main-container">
      <div className="sidebar"></div>
      <div className="leftmenu"></div>
      <div className="content">
        <Router>
          <Route path="/" exact component={Join} />
          <Route path="/chat" component={Chat} />
        </Router>
      </div>
    </div>
  );
};
export default App;
