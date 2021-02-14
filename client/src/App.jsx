import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { initAxiosInterceptors } from "./config/axios";

import Routes from "./routes/Routes";

initAxiosInterceptors();

function App() {

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
