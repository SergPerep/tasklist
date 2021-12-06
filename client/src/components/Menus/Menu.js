import { useClickOutside } from "../CustomHooks";
import MenuItem from "./MenuItem";

const Menu = props => {
    const {menuList, onClickOutside} = props; // array
    const domNode = useClickOutside(onClickOutside);
    return (
        <div className="menu" ref={domNode}>
            {menuList.map((item, index) => <MenuItem
                iconName={item.iconName}
                color={item.color}
                selected={item.selected}
                onClick={item.onClick}
                key={index}>
                {item.title}
            </MenuItem>)}
        </div>)
}

export default Menu;