import ReactDOM from "react-dom/client";
import React from "react";
import PropTypes from "prop-types";

import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, header, onClose }) => {
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  //логика навешивания и удаления обработчиков события нажатия клавиши "Esc"
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);
  // Возвращаем ReactDOM.createPortal,
  // который поместит дочерние элементы в modalRoot
  return ReactDOM.createPortal(
    <>
      <div className="Modal">
        <h1 onClose={onClose}>{header}</h1>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;

//проверкa типов PropTypes.
// Modal.propTypes = {
//   children: PropTypes.node.isRequired,
//   header: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

//компонент Modal — шапка с заголовком и иконкой закрытия;
//содержимое модального окна передается в компонент Modal как children ;
//логика навешивания и удаления обработчиков события нажатия
//клавиши "Esc" описана в компоненте Modal ;
//в компоненте Modal используется портал;

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: false,
//     };

//     this.handleOpenModal = this.handleOpenModal.bind(this);
//     this.handleCloseModal = this.handleCloseModal.bind(this);
//   }

//   handleOpenModal() {
//     this.setState({ visible: true });
//   }

//   handleCloseModal() {
//     this.setState({ visible: false });
//   }

//   render() {
//     const modal = (
//       <Modal header="Внимание!" onClose={this.handleCloseModal}>
//         <p>Спасибо за внимание!</p>
//         <p>Открывай меня, если станет скучно</p>
//       </Modal>
//     );

//     return (
//       <div style={{ overflow: "hidden" }}>
//         <button onClick={this.handleOpenModal}>Открыть модальное окно</button>
//         {this.state.visible && modal}
//       </div>
//     );
//   }
// }
