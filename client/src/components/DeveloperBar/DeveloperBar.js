import SocialButton from "./SocialButton";
import avatar from "../../img/avatar.jpg";

const DeveloperBar = () => {
    return <div className="devbar">
        <div className="developer">
            <img className="avatar" src={avatar} alt="developer Sergei Perepelkin" />
            <div className="desc">
                <span className="dev-name">Sergei Perepelkin</span>
                <span className="dev-position"> • Developer</span>
            </div>
        </div>
        <div className="btn-group">
            <SocialButton title={"GitHub"} iconName={"GitHub"} url="https://github.com/sergperep" />
            <SocialButton title={"LinkedIn"} iconName={"LinkedIn"} url="https://www.linkedin.com/in/sergey-perepelkin-b01482a6/" />
            <SocialButton title={"Twitter"} iconName={"Twitter"} url="https://twitter.com/sergperep" />
        </div>
    </div>
}

export default DeveloperBar;