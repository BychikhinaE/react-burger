import React, { useEffect } from "react";

import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";
import { useDrop } from "react-dnd";
import { INGREDIENT_TYPES } from "../../utils/constants";
import Total from "../total/total";
import {
  ADD_SELECTED_ITEM,
  DELETE_ITEM,
  UPDATE_COUNTERS,
} from "../../services/actions/constructor";
import { UPDATE_TOTAL } from "../../services/actions/order";
import {
  BunConstructor,
  IngredientConstructor,
} from "../ingredient-constructor/ingredient-constructor";

//ОСНОВНОЙ КОМПОНЕНТ, который вернет разметку справа
function BurgerConstructor() {
  const selectedItems = useSelector((state) => state.constr.selectedItems);
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "items",
    drop: ({ currentItem }) => {
      //  Проверим, если перетаскиваемый элемент - хлеб
      if (
        (currentItem.type === INGREDIENT_TYPES.BUN) &
        selectedItems.some((item) => item.type === INGREDIENT_TYPES.BUN)
      ) {
        const bunIndex = selectedItems.findIndex(
          (item) => item.type === INGREDIENT_TYPES.BUN
        );
        dispatch({
          type: DELETE_ITEM,
          index: bunIndex,
        });
      }
      // Отправим экшен с текущим перетаскиваемым элементом
      dispatch({
        type: ADD_SELECTED_ITEM,
        item: currentItem,
      });
    },
  });

  //Подписываемся на обновления выбранных ингредиентов
  useEffect(() => {
    dispatch({
      type: UPDATE_TOTAL,
      selectedItems: selectedItems,
    });
    dispatch({
      type: UPDATE_COUNTERS,
    });
  }, [dispatch, selectedItems]);

  return (
    <>
      <ul
        className={`${styles.gridConstr} ${
          isHover ? styles.onHover : ""
        } text pl-4  mb-10`}
        ref={dropTarget}
      >
        {selectedItems.map(
          (item, index) =>
            item.type === INGREDIENT_TYPES.BUN && (
              <BunConstructor
                item={item}
                key={uniqid()}
                position="top"
                isLocked={true}
                index={index}
              />
            )
        )}

        <ul className={`${styles.scroll} custom-scroll text`}>
          {selectedItems.map(
            (item, index) =>
              item.type !== INGREDIENT_TYPES.BUN && (
                <IngredientConstructor
                  item={item}
                  index={index}
                  key={uniqid()}
                  isLocked={false}
                />
              )
          )}
        </ul>

        {selectedItems.map(
          (item) =>
            item.type === INGREDIENT_TYPES.BUN && (
              <BunConstructor
                item={item}
                key={uniqid()}
                position="bottom"
                isLocked={true}
              />
            )
        )}
      </ul>

      <Total />
    </>
  );
}

export default React.memo(BurgerConstructor);
