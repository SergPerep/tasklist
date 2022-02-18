import useStore from "../../store/useStore";
import Menu from "../Menus/Menu";

const MenuForTask = ({ id, setIsModalOpen }) => {

    const setOpenedEdit = useStore(state => state.setOpenedEdit);
    
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