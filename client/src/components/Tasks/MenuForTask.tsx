import React from "react";
import { useActions } from "src/store";
import Menu from "../Menus/Menu";

type MenuForTaskArgs = {
    id: number,
    setIsModalOpen: (boolVal: boolean) => void
}

const MenuForTask = ({ id, setIsModalOpen }: MenuForTaskArgs) => {

    const setOpenedEdit = useActions(actions => actions.setOpenedEdit);

    const handleClickEdit = () => {
        setOpenedEdit(id);
    }

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    }

    return <div className="more-content">
        <Menu menuList={[{
            iconName: "Edit",
            title: "Edit",
            onClick: handleClickEdit
        }, {
            iconName: "Delete",
            title: "Delete",
            onClick: handleDeleteClick
        }]} />
    </div>
}

export default MenuForTask;