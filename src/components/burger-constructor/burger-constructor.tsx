import React from "react";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import uniqid from "uniqid";
import { useDrop } from "react-dnd";
import { INGREDIENT_TYPES } from "../../utils/constants";
import Total from "../total/total";
import {
  ADD_SELECTED_ITEM,
  DELETE_ITEM,
} from "../../services/actions/constructor";
import IngredientConstructor from "../ingredient-constructor/ingredient-constructor";
import BunConstructor from "../bun-constructor/bun-constructor";
import { IIngredient } from "../../services/types/data";

//ОСНОВНОЙ КОМПОНЕНТ, который вернет разметку справа
function BurgerConstructor() {
  const selectedItems = useSelector((state) => state.constr.selectedItems);
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "items",
    drop: (item: { currentItem: IIngredient }) => {
      //  Проверим, если перетаскиваемый элемент - хлеб
      if (
        item.currentItem.type === INGREDIENT_TYPES.BUN &&
        selectedItems.some(
          (item: IIngredient) => item.type === INGREDIENT_TYPES.BUN
        )
      ) {
        const bunIndex = selectedItems.findIndex(
          (item: IIngredient) => item.type === INGREDIENT_TYPES.BUN
        );
        dispatch({
          type: DELETE_ITEM,
          index: bunIndex,
        });
      }
      // Отправим экшен с текущим перетаскиваемым элементом
      dispatch({
        type: ADD_SELECTED_ITEM,
        item: { ...item.currentItem, sysid: uniqid() },
      });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <>
      <ul
        className={`${styles.gridConstr} ${
          isHover ? styles.onHover : ""
        } text pl-4  mb-10`}
        ref={dropTarget}
      >
        {selectedItems.map(
          (item: IIngredient, index: number) =>
            item.type === INGREDIENT_TYPES.BUN && (
              <BunConstructor
                item={item}
                key={item.sysid}
                position="top"
                isLocked={true}
              />
            )
        )}

        <ul className={`${styles.scroll} custom-scroll text`}>
          {selectedItems.map(
            (item: IIngredient, index: number) =>
              item.type !== INGREDIENT_TYPES.BUN && (
                <IngredientConstructor
                  item={item}
                  index={index}
                  key={item.sysid}
                  isLocked={false}
                />
              )
          )}
        </ul>

        {selectedItems.map(
          (item: IIngredient) =>
            item.type === INGREDIENT_TYPES.BUN && (
              <BunConstructor
                item={item}
                key={item.sysid}
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
