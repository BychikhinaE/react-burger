import { useMemo } from "react";
import PropTypes from "prop-types";
import { Loader } from "../loader/loader";
import { useSelector } from "react-redux";
import BurgerIngredientMenu from "../burger-ingredient-menu/burger-ingredient-menu";
import styles from "./ingredients-group.module.css";

const IngredientsGroup = ({ ingredientGroup,
  counters }) => {
  const items = useSelector((state) => state.menu.items);
  const itemsRequest = useSelector((state) => state.menu.itemsRequest);

  const currentObject = useMemo(
    () => items.filter((item) => item.type === ingredientGroup),
    [ingredientGroup, items]
  );

  return itemsRequest ? (
    <Loader size="large" />
  ) : (
    <ul className={`${styles.list} pr-2 pl-4 `}>
      {currentObject.map((item) => (
        <BurgerIngredientMenu
          item={item}
          key={item._id}
          counters={counters}
        />
      ))}
    </ul>
  );
};

//Проверка типов данных
IngredientsGroup.propTypes = {
  ingredientGroup: PropTypes.string.isRequired,
};

export default IngredientsGroup;
