import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import AppPage from "./components/Pages/AppPage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import checkWhetherUserIsAuthenticated from "./fetch/auth/checkWhetherUserIsAuthenticated";
import { useStore, useActions } from "./store";
import LoadingScreen from "./components/Pages/LoadingScreen";
import NotFoundPage from "./components/Pages/NotFoundPage";
import HomePage from "./components/Pages/HomePage";
import React from "react";

function App() {
  const isUserAuthenticated = useStore(state => state.isUserAuthenticated);
  const setIsUserAuthenticated = useActions(state => state.setIsUserAuthenticated);

  checkWhetherUserIsAuthenticated().then(result => setIsUserAuthenticated(result));

  const renderRootPathEl = () => {
    return <HomePage />
  }

  const renderAppPathEl = () => {
    switch (isUserAuthenticated) {
      case true:
        return <AppPage />
      case false:
        return <LoginPage />
      default:
        return <LoadingScreen />
    }
  }

  const renderLoginPathEl = () => {
    switch (isUserAuthenticated) {
      case true:
        return <Navigate to="/app" />
      case false:
        return <LoginPage />
      default:
        return <LoadingScreen />
    }
  }

  const renderSignupPathEl = () => {
    switch (isUserAuthenticated) {
      case true:
        return <Navigate to="/app" />
      case false:
        return <SignupPage />
      default:
        return <LoadingScreen />
    }
  }

  return <>
    <Router>
      <Routes>
        <Route path="/" element={renderRootPathEl()} />
        <Route path="/app" element={renderAppPathEl()} />
        <Route path="/login" element={renderLoginPathEl()} />
        <Route path="/signup" element={renderSignupPathEl()} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </>
}

export default App;
