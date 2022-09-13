import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/ingredientPropTypes";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient-menu.module.css";

//DragSource
const BurgerIngredientMenu = ({ item, onClickforInfo, counters }) => {
  const currentItem = item;

  const [, dragRef] = useDrag({
    type: "items",
    item: { currentItem },
  });

  return (
    <li
      className={`${styles.item} mb-10`}
      index={item._id}
      onClick={onClickforInfo}
      ref={dragRef}
    >
      {typeof counters[item._id] !== "undefined" && (
        <Counter count={counters[item._id]} size="default" />
      )}
      <img alt={item.name} src={item.image} />
      <div className={styles.price}>
        <p className="text text_type_digits-default pt-2 pb-3">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default pb-5">{item.name}</p>
    </li>
  );
};

BurgerIngredientMenu.propTypes = {
  item: ingredientPropTypes.isRequired,
  onClickforInfo: PropTypes.func.isRequired,
};

export default BurgerIngredientMenu;
