import React, { useRef, useCallback } from "react";
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
import { useDrop, useDrag } from "react-dnd";
import { Loader } from "../loader/loader";
//Проверка типа внутреннего объекта массива данных
import ingredientPropTypes from "../../utils/ingredientPropTypes";

import {
  setSelectedItems,
  CLOSE_MODAL_ORDER,
  GET_SELECTED_ITEM,
  DELETE_ITEM,
  UPDATE_TOTAL,
  UPDATE_LIST,
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
      //Проверим, если перетаскиваемый элемент - хлеб
      if (
        (currentType === "bun") &
        selectedItems.some((item) => item.type === "bun")
      ) {
        const bunIndex = selectedItems.findIndex((item) => item.type === "bun");
        dispatch({
          type: DELETE_ITEM,
          index: bunIndex,
        });
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
          .map((item) => (
            <ReturnBun
              item={item}
              key={uniqid()}
              position="top"
              isLocked={true}
              index={0}
            />
          ))}

        <ul className={`${styles.scroll} custom-scroll text`}>
          {selectedItems
            .filter((item) => item.type === "sauce" || item.type === "main")
            .map((item, index) => (
              <ReturnIngredient
                item={item}
                index={index + 1}
                key={uniqid()}
                isLocked={false}
              />
            ))}
        </ul>

        {selectedItems
          .filter((item) => item.type === "bun")
          .map((item) => (
            <ReturnBun
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
  const orderRequest = useSelector((state) => state.menu.orderRequest);
  //Массив id элементов в заказе
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
            {orderRequest ? <Loader size="large" /> : <OrderDetails />}

          </Modal>
        )}
      </>
    </>
  );
}

//Компонент для булочек
function ReturnBun({ item, position, isLocked }) {
  let halfBun = "";
  if (position === "top") {
    halfBun = " (верх)";
  }
  if (position === "bottom") {
    halfBun = " (низ)";
  }

  return (
    <li className={`${styles.item} text`}>
      <div className={styles.emptyIcon}></div>
      <ConstructorElement
        type={position}
        isLocked={isLocked}
        text={`${item.name}${halfBun}`}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
}

//Компонент для остальных ингредиентов
function ReturnIngredient({ item, index, isLocked }) {
  const ref = useRef();
  const dispatch = useDispatch();
  //Колбэк для пропса handleClose в ConstructorElement
  const deleteItem = useCallback(() => {
    dispatch({
      type: DELETE_ITEM,
      index: index,
    });
    dispatch({
      type: UPDATE_TOTAL,
    });
  }, [dispatch, index]);

  const selectedItems = useSelector((state) => state.menu.selectedItems);
  //Функция отвечающая за отправку экшена для перерисовки
  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      // dragItem-перетаскиваемый элемент
      const dragItem = selectedItems[dragIndex];
      const hoverItem = selectedItems[hoverIndex];

      dispatch({
        type: UPDATE_LIST,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
        hoverItem: hoverItem,
        dragItem: dragItem,
      });
    },
    [dispatch, selectedItems]
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "main",
    item: { index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  const [{ isHover }, drop] = useDrop({
    accept: "main",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },

    collect: (monitor) => {
      return {
        isHover: monitor.isOver(),
      };
    },
  });

  drag(drop(ref));

  return (
    <li
      className={`${styles.item} text`}
      ref={ref}
      style={{ opacity: isDragging || isHover ? 0 : 1 }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={isLocked}
        text={`${item.name}`}
        price={item.price}
        thumbnail={item.image}
        handleClose={deleteItem}
      />
    </li>
  );
}

//Проверка типов данных
ReturnIngredient.propTypes = {
  item: ingredientPropTypes.isRequired,
  index: PropTypes.number,
  isLocked: PropTypes.bool.isRequired,
};
ReturnBun.propTypes = {
  item: ingredientPropTypes.isRequired,
  position: PropTypes.string,
  isLocked: PropTypes.bool.isRequired,
};


export default React.memo(BurgerConstructor);
