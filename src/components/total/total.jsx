import styles from "./total.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedItems,
  CLOSE_MODAL_ORDER,
} from "../../services/actions/order";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Loader } from "../loader/loader";
//Модальное окно
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

//Компонент кнопки ЗАКАЗА и здесь МОДАЛЬНОЕ окно
function Total() {
  // Код мод.окна
  const dispatch = useDispatch();
  const orderRequest = useSelector((state) => state.order.orderRequest);
  //Массив id элементов в заказе
  const idSet = useSelector((state) => state.order.idSet);
  const total = useSelector((state) => state.order.total);
  const modalVisible = useSelector((state) => state.order.modalVisible);
  function submitOrder() {
    dispatch(setSelectedItems(idSet));
  }
  function closePopup() {
    dispatch({ type: CLOSE_MODAL_ORDER });
  }
  return (
    <>
      <div className={`${styles.gridButton} pr-4`}>
        <p className="text text_type_digits-medium pr-3">{total}</p>
        <div className={`${styles.currencyIcon} pl-2 pr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={submitOrder}
          disabled={idSet.length === 1}
        >
          Оформить заказ
        </Button>
      </div>

      {/* Модальное окно*/}
      <>
        {modalVisible && (
          <Modal header="" onClose={closePopup}>
            {orderRequest ? <Loader size="large" /> : <OrderDetails />}
          </Modal>
        )}
      </>
    </>
  );
}

export default Total;
