import React from "react"
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import AppPage from "./components/Pages/AppPage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import checkWhetherUserIsAuthenticated from "./fetch/auth/checkWhetherUserIsAuthenticated";
import useStore from "./store/useStore";
import LoadingScreen from "./components/Pages/LoadingScreen";
import NotFoundPage from "./components/Pages/NotFoundPage";
import HomePage from "./components/Pages/HomePage";

function App() {
  const isUserAuthenticated = useStore(state => state.isUserAuthenticated);
  const setIsUserAuthenticated = useStore(state => state.setIsUserAuthenticated);

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
