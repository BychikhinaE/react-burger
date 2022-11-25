import ReactDOM from "react-dom";
import React from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, header, onClose }) {
  //Если в модальном инф-ция о заказе, то в заголовок добавляем номер заказа(тут ищем его) и меняем стиль
  const orders = useSelector((state) => state.ws.orders);
  const { id } = useParams();
  let headerStyle = "text text_type_main-large";
  if (!header && orders && id) {
    header = `#${orders.find((item) => item._id === id).number}`;
    headerStyle = "text text_type_digits-default";
  }

  //логика навешивания и удаления обработчиков события нажатия клавиши "Esc"
  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={`${styles.modal} pt-15 pl-10 pr-10`}>
        <div className={`${styles.header} mb-3`}>
          <h2 className={headerStyle}>{header}</h2>
          <button className={styles.button} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;

//проверкa типов PropTypes.
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
