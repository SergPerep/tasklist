import { useClickOutside } from "../CustomHooks";
import MenuItem from "./MenuItem";

const Menu = props => {
    const menuList = props.menuList; // array
    const domNode = useClickOutside();
    return (
        <div className="menu" ref={domNode}>
            {menuList.map((item, index) => <MenuItem
                iconName={item.iconName}
                onClick={item.onClick}
                key={index}>
                {item.title}
            </MenuItem>)}
        </div>)
}

export default Menu;