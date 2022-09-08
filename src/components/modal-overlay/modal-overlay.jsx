//ModalOverlay — фоновая подложка под модальным окном;
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClick, children }) => {
  const closeByClickOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClick();
    }
  };

  return (
    <div className={styles.overlay} onClick={closeByClickOverlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;

//проверкa типов PropTypes.
ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
