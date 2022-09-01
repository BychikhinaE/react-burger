import React from "react";
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

//Проверка типа внутреннего объекта массива данных
import ingredientPropTypes from "../../utils/ingredientPropTypes";

import {
  setSelectedItems,
  CLOSE_MODAL_NUMBER,
  GET_SELECTEDITEM_ID,
} from "../../services/actions/actions";
//Модальное окно
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

//ОСНОВНОЙ КОМПОНЕНТ, который вернет разметку справа
function BurgerConstructor() {
  const selectedItems = useSelector((state) => state.menu.selectedItems);
  //onst dispatch = useDispatch();

  // selectedItems.forEach((item) =>
  //     dispatch({type: GET_SELECTEDITEM_ID,  idItem: item._id}))

  //Пока ничего не заказано будет отображаться приветствие
  if (selectedItems.length > 0) {
    //Найти в массиве выбранную булку
    const bunCheck = selectedItems.find((item) => item.type === "bun");

    //Найти массив выбранного инопланетного наполнителя
    const anotherIngredietsCheck = selectedItems.filter((item) => {
      return item.type === "sauce" || item.type === "main";
    });

    //Сумма заказа
    const total = anotherIngredietsCheck.reduce(
      (acc, p) => acc + p.price,
      bunCheck.price * 2
    );

    return (
      <>
        <ul className={`${styles.gridConstr} text pl-4  mb-10`}>
          <ReturnIngredients
            item={bunCheck}
            key={`${bunCheck._id}-top`}
            type="top"
            isLocked={true}
          />
          {/* этот ключ не подходит? библиотека ui-id - создавать уникальный ключ */}
          <ul className={`${styles.scroll} custom-scroll text`}>
            {anotherIngredietsCheck.reduce((insideBurger, item) => {
              insideBurger.push(
                <ReturnIngredients
                  item={item}
                  key={uniqid()}
                  isLocked={false}
                />
              );

              return insideBurger;
            }, [])}
          </ul>

          <ReturnIngredients
            item={bunCheck}
            key={`${bunCheck._id}-bottom`}
            type="bottom"
            isLocked={true}
          />
        </ul>

        <Total total={total} />
      </>
    );
  } else {
    return (
      <>
        <div className={`${styles.gridConstr} text text_type_main-large p-10`}>
          <h2>Добро пожаловать!</h2>
          <p>Готовы сделать заказ?</p>
        </div>
        <Total total={0} />
      </>
    );
  }
}

//Компонент кнопки ЗАКАЗА и здесь МОДАЛЬНОЕ окно
function Total({ total }) {
  // Код мод.окна
  const dispatch = useDispatch();
  const idArray = useSelector((state) => state.menu.order.idArray);
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
          onClick={() => dispatch(setSelectedItems(idArray))}
          disabled={idArray.length === 0}
        >
          Оформить заказ
        </Button>
      </div>

      {/* Модальное окно*/}
      <>
        {modalVisible && (
          <Modal
            header=""
            onClose={() => dispatch({ type: CLOSE_MODAL_NUMBER })}
          >
            <OrderDetails />
          </Modal>
        )}
      </>
    </>
  );
}

//Вспомогательный компонент вернёт разметку ингредиента взависимости от переданных параметров
function ReturnIngredients({ item, type, isLocked }) {
  let halfBun = "";
  if (type === "top") {
    halfBun = " (верх)";
  }
  if (type === "bottom") {
    halfBun = " (низ)";
  }

  return (
    <li className={`${styles.item} text`}>
      {item.type === "bun" ? (
        <div className={styles.emptyIcon}></div>
      ) : (
        <DragIcon type="primary" />
      )}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={`${item.name}${halfBun}`}
        price={item.price}
        thumbnail={item.image}
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

export default React.memo(BurgerConstructor);
