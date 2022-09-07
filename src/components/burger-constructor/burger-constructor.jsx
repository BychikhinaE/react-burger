import React, { useEffect } from "react";
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
  CLOSE_MODAL_NUMBER,
  GET_SELECTED_ITEM,
  DELETE_ITEM,
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
    drop(itemId) {
      // Отправим экшен с текущим перетаскиваемым элементом и названием доски
      dispatch({
        type: GET_SELECTED_ITEM,
        id: itemId,
      });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });


  let bunCheck = [];
  let total = '0';
  let selectedItemsId = [];
  let anotherIngredietsCheck = [];


  // if (selectedItems.length > 0) {
  //   console.log(selectedItems);
  //   //Найти в массиве выбранную булку
  //   bunCheck = selectedItems.find((item) => item.type === "bun");

  //   //Найти массив выбранного инопланетного наполнителя
  //   anotherIngredietsCheck  = selectedItems.filter((item) => {
  //     return item.type === "sauce" || item.type === "main";
  //   });

//Сумма заказа
// total = anotherIngredietsCheck.reduce(
//   (acc, p) => acc + p.price,
//   bunCheck.price * 2
// );
  //   selectedItemsId = selectedItems.forEach((element) => element._id);
  // }




  return (
    <>
      <ul
        className={`${styles.gridConstr} ${
          isHover ? styles.onHover : ""
        } text pl-4  mb-10`}
        ref={dropTarget}
      >
        {bunCheck.length !== 0 && (
          <ReturnIngredients
            item={bunCheck}
            //key={`${bunCheck._id}-top`}
            type="top"
            isLocked={true}
          />
        )}

        <ul className={`${styles.scroll} custom-scroll text`} >
          {selectedItems.length !== 0 &&
            selectedItems.map((item) =>
              <ReturnIngredients item={item} key={uniqid()} isLocked={false} />
            )}
        </ul>

        {bunCheck.length !== 0 && (
          <ReturnIngredients
            item={bunCheck}
            //key={`${bunCheck._id}-bottom`}
            type="bottom"
            isLocked={true}
          />
        )}
      </ul>

      <Total total={total} selectedItemsId={selectedItemsId}/>
    </>
  );
}

//Компонент кнопки ЗАКАЗА и здесь МОДАЛЬНОЕ окно
function Total({ total, selectedItemsId }) {
  // Код мод.окна
  const dispatch = useDispatch();

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
          onClick={() => dispatch(setSelectedItems(selectedItemsId))}
          disabled={selectedItemsId.length === 0}
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

export default BurgerConstructor;
// const onDelete = () => {
//   dispatch({
//     type: DELETE_POSTPONED_ITEM,
//     id
//   });
// };

//  // Отображение DraggableAnimal в целевом элементе "default"
//  const draggableAnimalPreview = (
//   <div ref={drag} className={styles.animalElement}>
//       {data.content}
//   </div>
// );

// // Отображение DraggableAnimal в других целевых элементах
// const draggableAnimalCard = (
//   <div ref={drag} className={styles.item}>
//       <span className={styles.animalItem}>
//           {data.content}
//       </span>
//       <p>
//           {data.description}
//       </p>
//   </div>
// );
