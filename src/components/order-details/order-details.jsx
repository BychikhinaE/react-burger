import styles from "./order-details.module.css";
import {  useSelector } from "react-redux";

function OrderDetails() {
  const numberOrder = useSelector((state) => state.menu.order.numberOrder);

  return (
    <>
      <h3 className="text text_type_digits-large mb-8 mt-6">{numberOrder }</h3>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={styles.checkIcon}></div>
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;

