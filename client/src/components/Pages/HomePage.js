import DeveloperBar from "../DeveloperBar/DeveloperBar";
import HomeTopNav from "../HomeTopNav";
import { ReactComponent as LogoFull } from "../../img/logo/LogoFull.svg";
import Button from "../BasicUI/Button";
import uiShowcaseDesktop from "../../img/ui-showcase-desktop.png";
import uiShowcaseMobile from "../../img/ui-showcase-mobile.png";
import useStore from "../../store/useStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const isScreenSmall = useStore(state => state.isScreenSmall);
    const setIsScreenSmall = useStore(state => state.setIsScreenSmall);
    const showcaseImageURL = isScreenSmall ? uiShowcaseMobile : uiShowcaseDesktop;

    useEffect(() => {
        const updateDimensions = () => setIsScreenSmall(window.innerWidth);
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [])

    const navigate = useNavigate();

    const handleClickTry = () => navigate("/login")
    const handleEnterTry = e => {
        if (e.key !== "Enter") return;
        handleClickTry();
    }

    const handleClickGitHub = () => window.open("https://github.com/sergperep/tasklist", "_blank")
    const handleEnterGitHub = e => {
        if (e.key !== "Enter") return;
        handleClickGitHub();
    }

    return <div className="canvas home-page">
        <HomeTopNav />
        <main>
            <LogoFull className="logo" />
            <p className="app-desc">Todo-list demo project</p>
            <div className="btn-group">
                <Button
                    design="outlined"
                    onClick={handleClickGitHub}
                    onKeyDown={handleEnterGitHub}
                >
                    Check code on GitHub
                </ Button>
                <Button
                    onClick={handleClickTry}
                    onKeyDown={handleEnterTry}
                >
                    Try Tasklist
                </Button>
            </div>
            <img
                className="ui-showcase"
                src={showcaseImageURL}
                alt="Showcase of user interface" />
        </main>
        <DeveloperBar />
    </div>
}

export default HomePage;