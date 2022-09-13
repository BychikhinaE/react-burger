import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ingredient-constructor.module.css";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import { BUN_POSITION } from "../../utils/constants";
//Проверка типа внутреннего объекта массива данных
import ingredientPropTypes from "../../utils/ingredientPropTypes";
import {
  DELETE_ITEM,
  TOGGLE_LIST,
  UPDATE_COUNTERS,
} from "../../services/actions/constructor";
import { UPDATE_TOTAL } from "../../services/actions/order";

//Компонент для булочек, отображается в конструкторе
export function BunConstructor({ item, position, isLocked }) {
  let halfBun = "";
  if (position === BUN_POSITION.TOP) {
    halfBun = " (верх)";
  }
  if (position === BUN_POSITION.BOTTOM) {
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

//Компонент для остальных ингредиентов, отображается в конструкторе
export function IngredientConstructor({ item, index, isLocked }) {
  const selectedItems = useSelector((state) => state.constr.selectedItems);
  const ref = useRef();
  const dispatch = useDispatch();
  //Колбэк для пропса handleClose в ConstructorElement
  const deleteItem = useCallback(() => {
    dispatch({
      type: DELETE_ITEM,
      index: index,
    });
  }, [dispatch, index]);

  //Функция отвечающая за отправку экшена для перерисовки
  const moveItem = (dragIndex, hoverIndex) => {
    // dragItem-перетаскиваемый элемент
    const dragItem = selectedItems[dragIndex];
    const hoverItem = selectedItems[hoverIndex];

    dispatch({
      type: TOGGLE_LIST,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
      hoverItem: hoverItem,
      dragItem: dragItem,
    });
  };

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
      className={`${styles.item} text ${
        isDragging || isHover ? styles.drag : ""
      }`}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        type={undefined}
        isLocked={isLocked}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={deleteItem}
      />
    </li>
  );
}

//Проверка типов данных
IngredientConstructor.propTypes = {
  item: ingredientPropTypes.isRequired,
  index: PropTypes.number,
  isLocked: PropTypes.bool.isRequired,
};
BunConstructor.propTypes = {
  item: ingredientPropTypes.isRequired,
  position: PropTypes.string,
  isLocked: PropTypes.bool.isRequired,
};
