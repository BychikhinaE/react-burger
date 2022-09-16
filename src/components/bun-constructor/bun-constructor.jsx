import styles from "./bun-constructor.module.css";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BUN_POSITION } from "../../utils/constants";
//Проверка типа внутреннего объекта массива данных
import ingredientPropTypes from "../../utils/ingredientPropTypes";

//Компонент для булочек, отображается в конструкторе
export default function BunConstructor({ item, position, isLocked }) {
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

BunConstructor.propTypes = {
  item: ingredientPropTypes.isRequired,
  position: PropTypes.string,
  isLocked: PropTypes.bool.isRequired,
};
