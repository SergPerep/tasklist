import { NavLink } from "react-router-dom";
import { ReactComponent as LogoFull } from "../img/logo/LogoFull.svg";
const HomeTopNav = () => {
    return <div className="home-top-nav">
        <NavLink to="/" className="logo-container">
            <LogoFull/>
        </NavLink>
        <div className="btn-group">
            <NavLink to="/login" className="home-top-nav-btn">Login</NavLink>
            <NavLink to="/signup" className="home-top-nav-btn">Sign up</NavLink>
        </div>
    </div>
}

export default HomeTopNav;