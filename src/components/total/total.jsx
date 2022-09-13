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
import { INGREDIENT_TYPES } from "../../utils/constants";

//Компонент кнопки ЗАКАЗА и здесь МОДАЛЬНОЕ окно
function Total() {
  const selectedItems = useSelector((state) => state.constr.selectedItems);
  //Здесь считаем сумму заказа и формируем список айдишек для отправки на сервер
  let priceSecondBun = 0;
  let bunId = undefined;
  if (selectedItems.some((item) => item.type === INGREDIENT_TYPES.BUN)) {
    const bun = selectedItems.find(
      (item) => item.type === INGREDIENT_TYPES.BUN
    );
    priceSecondBun = bun.price;
    bunId = bun._id;
  }
  const idSet = [...selectedItems.map((item) => item._id), bunId];
  const total = selectedItems.reduce(
    (acc, item) => acc + item.price,
    priceSecondBun
  );

  // Код мод.окна
  const dispatch = useDispatch();
  const orderRequest = useSelector((state) => state.order.orderRequest);
  //Массив id элементов в заказе

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
          disabled={idSet.some((item) => item === undefined)}
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
