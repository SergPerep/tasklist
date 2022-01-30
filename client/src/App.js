import React, { useContext, useState } from "react"
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import { AuthenticationContext } from "./components/contexts/AuthenticationContext";
import DevelopComp from "./components/DevelopComp";


function App() {
  const { isUserAuthenticated } = useContext(AuthenticationContext);

  return (
    <>
    <DevelopComp/>
    <Router>
      <Routes>
        <Route path="/" element={isUserAuthenticated ? <MainPage /> : <Navigate to="/login"/>} />
        <Route path="/login" element={isUserAuthenticated ? <Navigate to="/"/> : <LoginPage />} />
        <Route path="/signup" element={isUserAuthenticated ? <Navigate to="/"/> : <SignupPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
