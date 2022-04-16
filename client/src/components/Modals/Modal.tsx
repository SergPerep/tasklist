import React from "react";
import Button from "../BasicUI/Button";

type ModalArgs = {
    buttonList: buttonList,
    children: any
}

type buttonList = {
    disabled?: boolean,
    type?: "submit" | "button" | "reset" | undefined,
    form?: string,
    value?: string,
    onClick: () => void,
    design?: string,
    title: string
}[]

const Modal = ({buttonList, children}: ModalArgs) => {
    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    {children}
                </div>
                {buttonList &&
                    <div className="modal-button-group">
                        {buttonList.map((button, index) => <Button
                            disabled={button.disabled}
                            type={button.type}
                            form={button.form}
                            value={button.value}
                            onClick={button.onClick}
                            design={button.design}
                            key={index}>
                                {button.title}</Button>)}
                    </div>
                }
            </div>
        </div>
    )
}

export default Modal;