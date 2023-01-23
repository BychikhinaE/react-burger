import { useRef, useCallback, FC } from "react";
import { useDispatch } from "'../../services/hooks/hooks'";
import styles from "./ingredient-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import { DELETE_ITEM, TOGGLE_LIST } from "../../services/actions/constructor";
import { IItemConstructorProps } from "../../services/types/data";

//Компонент "подвижных" ингредиентов, отображается в конструкторе
const IngredientConstructor: FC<IItemConstructorProps & { index: number }> = ({
  item,
  index,
  isLocked,
}) => {
  const ref = useRef();
  const dispatch = useDispatch();
  //Колбэк для пропса handleClose в ConstructorElement
  const deleteItem = useCallback(() => {
    dispatch({
      type: DELETE_ITEM,
      index: index,
    });
  }, [dispatch, index]);

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
      //Меняем местами элементы в массиве
      dispatch({
        type: TOGGLE_LIST,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });

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
      <div className={styles.shrink}>
        <DragIcon type="primary" />
      </div>
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
};

export default IngredientConstructor;
