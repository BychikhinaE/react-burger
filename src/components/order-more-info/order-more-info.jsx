import styles from "./order-more-info.module.css";
import { useSelector } from "react-redux";
import {
  CurrencyIcon,

} from "@ya.praktikum/react-developer-burger-ui-components";
import { TAB_NAME, INGREDIENT_TYPES } from "../../utils/constants";
import React, { useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";

function OrderMoreInfo() {
  const items = useSelector((state) => state.menu.items);
  // Только тут ай-ди заказа
  const { id } = useParams();
  const ingredient = items.find((item) => item._id === id);


  const numberOrder = useSelector((state) => state.order.numberOrder);
  const selectedItems = useSelector((state) => state.constr.selectedItems);

  const counters = useMemo(
    () =>
      selectedItems.reduce((prevVal, item) => {
        if (!prevVal[item._id]) {
          if (item.type === INGREDIENT_TYPES.BUN) {
            prevVal[item._id] = 2;
          } else {
            prevVal[item._id] = 1;
          }
        } else {
          prevVal[item._id]++;
        }
        return prevVal;
      }, {}),
    [selectedItems]
  );

  //Здесь считаем сумму заказа снова((
  let priceSecondBun = 0;
  let bunId = undefined;
  if (selectedItems.some((item) => item.type === INGREDIENT_TYPES.BUN)) {
    const bun = selectedItems.find(
      (item) => item.type === INGREDIENT_TYPES.BUN
    );
    priceSecondBun = bun.price;
    bunId = bun._id;
  }

  const total = selectedItems.reduce(
    (acc, item) => acc + item.price,
    priceSecondBun
  );


  return (
    <>
      <p className="text text_type_digits-medium mb-8 mt-6">{numberOrder}</p>
      <h3 className="text text_type_main-medium mb-15">
        крутое название бургера
      </h3>
      <div className={styles.status}>статус</div>
      <h4 className="text text_type_main-default mt-15 mb-2">Состав</h4>
      <ul>
      {selectedItems.map((item) => (
           <li>
           <img alt={item.name} src={item.image} />
           <p className="text text_type_main-default pb-5">{item.name}</p>
           <div className={styles.price}>
        <p className="text text_type_digits-default pt-2 pb-3">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
         </li>
      ))}


      </ul>
    </>
  );
}

export default OrderMoreInfo;
