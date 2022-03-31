import { NavLink } from "react-router-dom";
import { ReactComponent as LogoFull } from "../img/logo/LogoFull.svg";
const LandingTopNav = () => {
    return <div className="landing-top-nav">
        <NavLink to="/" className="logo-container">
            <LogoFull/>
        </NavLink>
        <div className="btn-group">
            <NavLink to="/login" className="landing-top-nav-btn">Login</NavLink>
            <NavLink to="/signup" className="landing-top-nav-btn">Sign up</NavLink>
        </div>
    </div>
}

export default LandingTopNav;