import "./Modal.css";

const Modal = ({children}) => {
    return (
        <div className="modal-container">
            <div className="modal-inner">
                {children}
            </div>
        </div>
    );
};

export default Modal;