import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/ingredientPropTypes";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient-menu.module.css";
import { useLocation, Link } from "react-router-dom";

//DragSource
const BurgerIngredientMenu = ({ item, counters }) => {
  const currentItem = item;
  const currentId = item._id;
  const [, dragRef] = useDrag({
    type: "items",
    item: { currentItem },
  });

  const location = useLocation();

  return (
    <Link
      className={`${styles.item} mb-10`}
      index={currentId}
      ref={dragRef}
      to={{
        pathname: `/ingredients/${currentId}`,
        state: { background: location },
      }}
    >
      {typeof counters[currentId] !== "undefined" && (
        <Counter count={counters[currentId]} size="default" />
      )}
      <img alt={item.name} src={item.image} />
      <div className={styles.price}>
        <p className="text text_type_digits-default pt-2 pb-3">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default pb-5">{item.name}</p>
    </Link>
  );
};

BurgerIngredientMenu.propTypes = {
  item: ingredientPropTypes.isRequired,
};

export default BurgerIngredientMenu;
