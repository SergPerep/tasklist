import React, { useEffect } from "react"
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import checkWhetherUserIsAuthenticated from "./fetch/auth/checkWhetherUserIsAuthenticated";
import useStore from "./store/useStore";

function App() {
  const isUserAuthenticated = useStore(state => state.isUserAuthenticated);
  const setIsUserAuthenticated = useStore(state => state.setIsUserAuthenticated);

  useEffect(() => {
    checkWhetherUserIsAuthenticated().then(result => setIsUserAuthenticated(result));
}, [])

  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* 
        <Route path="/" element={isUserAuthenticated ? <MainPage /> : <Navigate to="/login"/>} />
        <Route path="/login" element={isUserAuthenticated ? <Navigate to="/"/> : <LoginPage />} />
        <Route path="/signup" element={isUserAuthenticated ? <Navigate to="/"/> : <SignupPage />} />
        */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
