import { MouseEventHandler, useState } from "react";
import ColorDisplay from "../BasicUI/ColorDisplay";
import Icon from "../BasicUI/Icon";
import Menu from "../Menus/Menu";
import { useClickOutside } from "../CustomHooks";
import ModalDeleteProject from "../Modals/ModalDeleteProject";
import ModalEditProject from "../Modals/ModalEditProject";
import React from "react";

type ProjectItemArgs = {
    onClick: MouseEventHandler, 
    selected: boolean, 
    count: number | null, 
    colorStr: string | undefined, 
    projectId: number,
    children: any
}

const ProjectItem = ({ onClick, selected, count, colorStr, projectId, children }: ProjectItemArgs) => {
    count = count || 0;
    const [isThisItemHovered, setIsThisItemHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const isMoreIconShown = isThisItemHovered || isMenuOpen;
    const domNode = useClickOutside(() => {
        setIsMenuOpen(false);
    });

    const handleClickMore: MouseEventHandler = e => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen)
    }

    const menuList = [{
        title: "Edit",
        iconName: "Edit",
        onClick: () => {
            setIsEditModalOpen(true);
            setIsThisItemHovered(false);
        }
    }, {
        title: "Delete",
        iconName: "Delete",
        onClick: () => {
            setIsDeleteModalOpen(true);
            setIsThisItemHovered(false);
        }
    }];
    return <>
        <div className={`sidenav-item ${selected ? "selected" : ""} ${isMenuOpen ? "more-is-open" : ""}`}
            onClick={onClick}
            onMouseOver={() => setIsThisItemHovered(true)}
            onMouseLeave={() => setIsThisItemHovered(false)}>
            {colorStr && <ColorDisplay colorStr={colorStr} size="md" />}
            <div className="sidenav-desc">
                {children}
            </div>
            {!isMoreIconShown && count > 0 &&
                <div className="sidenav-count">
                    {count}
                </div>
            }
            {isMoreIconShown && <div className="more" onClick={handleClickMore}>
                <div className="more-icon">
                    <Icon size="md" name="More" />
                </div>
                {isMenuOpen &&
                    <div className="more-content" ref={domNode}>
                        <Menu menuList={menuList} />
                    </div>
                }
            </div>}


        </div>
        {isDeleteModalOpen &&
            <ModalDeleteProject setIsModalOpen={setIsDeleteModalOpen} projectId={projectId} />
        }
        {isEditModalOpen &&
            <ModalEditProject setIsModalOpen={setIsEditModalOpen} projectId={projectId} />
        }
    </>
}

export default ProjectItem;