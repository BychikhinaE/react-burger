import styles from "./total.module.css";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
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
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

//Компонент кнопки ЗАКАЗА и здесь МОДАЛЬНОЕ окно
function Total() {
  const selectedItems = useSelector((state) => state.constr.selectedItems);

  //Здесь считаем сумму заказа и формируем список айдишек для отправки на сервер
  let priceSecondBun: number | undefined = 0;
  let bunId: string | undefined = undefined;
  if (selectedItems.some((item) => item.type === INGREDIENT_TYPES.BUN)) {
    const bun = selectedItems.find(
      (item) => item.type === INGREDIENT_TYPES.BUN
    );
    priceSecondBun = bun?.price;
    bunId = bun?._id;
  }

  const total = selectedItems.reduce(
    (acc = 0, item) => acc + item.price,
    priceSecondBun
  );

  // Код мод.окна
  const history = useHistory();
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const orderRequest = useSelector((state) => state.order.orderRequest);
  const modalVisible = useSelector((state) => state.order.modalVisible);

  const submitOrder = useCallback(() => {
    const idSet: Array<string | undefined> = [
      bunId,
      ...selectedItems
        .filter((item) => item.type !== INGREDIENT_TYPES.BUN)
        .map((item) => item._id),
      bunId,
    ];

    if (!isAuth) {
      history.push("/login");
    } else {
      dispatch(setSelectedItems(idSet));
    }
  }, [bunId, dispatch, history, isAuth, selectedItems]);

  const closePopup = useCallback(() => {
    dispatch({ type: CLOSE_MODAL_ORDER });
  }, [dispatch]);

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
          disabled={bunId === undefined}
        >
          Оформить заказ
        </Button>
      </div>

      {/* Модальное окно*/}
      <>
        {modalVisible && (
          <Modal onClose={closePopup}>
            {orderRequest ? <Loader /> : <OrderDetails />}
          </Modal>
        )}
      </>
    </>
  );
}

export default Total;
