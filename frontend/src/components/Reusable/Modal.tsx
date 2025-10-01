import "../../sass/components/modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // The overlay that covers the screen
    <div className="modal-overlay" onClick={onClose}>
      {/* The modal content, clicks inside won't close it */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times; {/* This is an 'X' symbol */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
