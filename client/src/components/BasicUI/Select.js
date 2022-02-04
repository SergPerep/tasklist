import { useState } from "react";
import Menu from "../Menus/Menu";

const Select = props => {
    const { placeholder, selectList, label } = props;
    const [openSelect, setOpenSelect] = useState(false);
    return <div className="select">
        <div className="select-label">{label}</div>
        <div className="select-field" onClick={() => setOpenSelect(!openSelect)}>
            <div className="select-display">{props.children}</div>
            {openSelect &&
                <div className="select-content">
                    <Menu menuList={selectList} onClickOutside={() => setOpenSelect(false)} />
                </div>
            }
        </div>
    </div>
}

export default Select;