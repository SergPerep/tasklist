import Button from "../atoms/Button"
const Modal = props => {
    const buttonList = props.buttonList;
    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    {props.children}
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