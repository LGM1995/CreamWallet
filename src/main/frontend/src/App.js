import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import Join from "./components/Join";
import Cream from "./components/Cream";


const App = () => {

    return (
      <Router>
          <div>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/cream" element={<Cream />} />
                  <Route path="/join" element={<Join />} />
              </Routes>
          </div>
      </Router>
    );
};

export default App;