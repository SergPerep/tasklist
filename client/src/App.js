import React, { useEffect } from "react"
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import checkWhetherUserIsAuthenticated from "./fetch/auth/checkWhetherUserIsAuthenticated";
import useStore from "./store/useStore";
import LoadingScreen from "./components/Pages/LoadingScreen";

function App() {
  const isUserAuthenticated = useStore(state => state.isUserAuthenticated);
  const setIsUserAuthenticated = useStore(state => state.setIsUserAuthenticated);

  const openEditArr = useStore(state => state.openEditArr);
  // console.log({ openEditArr });

  useEffect(() => {
    checkWhetherUserIsAuthenticated().then(result => setIsUserAuthenticated(result));
  }, [])

  const renderMainPathEl = () => {
    switch (isUserAuthenticated) {
      case true:
        return <MainPage />
      case false:
        return <Navigate to="/login" />
      default:
        return <LoadingScreen />
    }
  }

  const renderLoginPathEl = () => {
    switch (isUserAuthenticated) {
      case true:
        return <Navigate to="/" />
      case false:
        return <LoginPage />
      default:
        return <LoadingScreen />
    }
  }

  const renderSignupPathEl = () => {
    switch (isUserAuthenticated) {
      case true:
        return <Navigate to="/" />
      case false:
        return <SignupPage />
      default:
        return <LoadingScreen />
    }
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={renderMainPathEl()} />
          <Route path="/login" element={renderLoginPathEl()} />
          <Route path="/signup" element={renderSignupPathEl()} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
