import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";
import { useDrop } from "react-dnd";

//Проверка типа внутреннего объекта массива данных
import ingredientPropTypes from "../../utils/ingredientPropTypes";

import {
  setSelectedItems,
  CLOSE_MODAL_ORDER,
  GET_SELECTED_ITEM,
  DELETE_ITEM,
  UPDATE_TOTAL,
} from "../../services/actions/actions";
//Модальное окно
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

//ОСНОВНОЙ КОМПОНЕНТ, который вернет разметку справа
function BurgerConstructor() {
  const selectedItems = useSelector((state) => state.menu.selectedItems);
  const dispatch = useDispatch();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "items",
    drop: ({ currentId, currentType }) => {
      if (
        (currentType === "bun") &
        selectedItems.some((item) => item.type === "bun")
      ) {
        const bunIndex = selectedItems.findIndex((item) => item.type === "bun");
        selectedItems.splice(bunIndex, 1);
      }

      // Отправим экшен с текущим перетаскиваемым элементом
      dispatch({
        type: GET_SELECTED_ITEM,
        id: currentId,
      });
      //И экшен для обновления суммы и массива id в заказе
      dispatch({
        type: UPDATE_TOTAL,
      });
    },
    // collect: (monitor) => ({
    //   isHover: monitor.isOver(),
    // }),
  });

  return (
    <>
      <ul
        className={`${styles.gridConstr} ${
          isHover ? styles.onHover : ""
        } text pl-4  mb-10`}
        ref={dropTarget}
      >
        {selectedItems
          .filter((item) => item.type === "bun")
          // Отрисуем массив
          .map((item) => (
            <ReturnIngredients
              item={item}
              key={uniqid()}
              position="top"
              isLocked={true}
            />
          ))}

        <ul className={`${styles.scroll} custom-scroll text`}>
          {selectedItems
            .filter((item) => item.type === "sauce" || item.type === "main")
            // Отрисуем массив
            .map((item) => (
              <ReturnIngredients item={item} key={uniqid()} isLocked={false} />
            ))}
        </ul>

        {selectedItems
          .filter((item) => item.type === "bun")
          // Отрисуем массив
          .map((item) => (
            <ReturnIngredients
              item={item}
              key={uniqid()}
              position="bottom"
              isLocked={true}
            />
          ))}
      </ul>

      <Total />
    </>
  );
}

//Компонент кнопки ЗАКАЗА и здесь МОДАЛЬНОЕ окно
function Total() {
  // Код мод.окна
  const dispatch = useDispatch();

  const idSet = useSelector((state) => state.menu.order.idSet);
  const total = useSelector((state) => state.menu.order.total);
  const modalVisible = useSelector((state) => state.menu.order.modalVisible);

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
          onClick={() => dispatch(setSelectedItems(idSet))}
          disabled={idSet.length === 0}
        >
          Оформить заказ
        </Button>
      </div>

      {/* Модальное окно*/}
      <>
        {modalVisible && (
          <Modal
            header=""
            onClose={() => dispatch({ type: CLOSE_MODAL_ORDER })}
          >
            <OrderDetails />
          </Modal>
        )}
      </>
    </>
  );
}

//Вспомогательный компонент вернёт разметку ингредиента взависимости от переданных параметров
function ReturnIngredients({ item, position, isLocked }) {
  let halfBun = "";
  if (position === "top") {
    halfBun = " (верх)";
  }
  if (position === "bottom") {
    halfBun = " (низ)";
  }
  const currentItem = useRef();
  const dispatch = useDispatch();

  function deleteItem() {
    console.log(currentItem);
    dispatch({
      type: DELETE_ITEM,
      id: item._id,
    });
    dispatch({
      type: UPDATE_TOTAL,
    });
  }

  return (
    <li className={`${styles.item} text`} ref={currentItem}>
      {item.type === "bun" ? (
        <div className={styles.emptyIcon}></div>
      ) : (
        <DragIcon type="primary" />
      )}
      <ConstructorElement
        type={position}
        isLocked={isLocked}
        text={`${item.name}${halfBun}`}
        price={item.price}
        thumbnail={item.image}
        handleClose={deleteItem}
      />
    </li>
  );
}

//Проверка типов данных
// ReturnIngredients.propTypes = {
//   item: ingredientPropTypes.isRequired,
//   type: PropTypes.string,
//   isLocked: PropTypes.bool.isRequired,
// };

// Total.propTypes = {
//   total: PropTypes.number,
//   idSelectedElements: PropTypes.array,
// };

export default BurgerConstructor;
