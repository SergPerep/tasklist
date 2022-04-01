import DeveloperBar from "../DeveloperBar/DeveloperBar";
import HomeTopNav from "../HomeTopNav";
import { ReactComponent as LogoFull } from "../../img/logo/LogoFull.svg";
import Button from "../BasicUI/Button";
import uiShowcaseDesktop from "../../img/ui-showcase-desktop.png";
import uiShowcaseMobile from "../../img/ui-showcase-mobile.png";
import useStore from "../../store/useStore";
import { useEffect } from "react";

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

    return <div className="canvas home-page">
        <HomeTopNav />
        <main>
            <LogoFull className="logo" />
            <p className="app-desc">Todo-list demo project</p>
            <div className="btn-group">
                <Button design="outlined">Check code on GitHub</ Button>
                <Button>Try Tasklist</Button>
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