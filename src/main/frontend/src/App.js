import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import Join from "./components/Join";
import Cream from "./components/Cream";

import { logout } from "./slices/auth";

const App = () => {
    // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    // const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
      <Router>
          <div>
              <div className="container mt-3">
                  <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/cream" element={<Cream />} />
                      <Route path="/join" element={<Join />} />
                  </Routes>
              </div>
          </div>
      </Router>
    );
};

export default App;