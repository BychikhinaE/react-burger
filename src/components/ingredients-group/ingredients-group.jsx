import PropTypes from "prop-types";
import { Loader } from "../loader/loader";
import { useSelector } from "react-redux";
import BurgerIngredientMenu from "../burger-ingredient-menu/burger-ingredient-menu";
import styles from "./ingredients-group.module.css";

const IngredientsGroup = ({ ingredientGroup, onClickforInfo }) => {
  const items = useSelector((state) => state.menu.items);
  const itemsRequest = useSelector((state) => state.menu.itemsRequest);

  const currentObject = items.filter((item) => item.type === ingredientGroup);

  return itemsRequest ? (
    <Loader size="large" />
  ) : (
    <ul className={`${styles.list} pr-2 pl-4 pb-10`}>
      {currentObject.map((item) => (
        <BurgerIngredientMenu
          item={item}
          key={item._id}
          onClickforInfo={onClickforInfo}
        />
      ))}
    </ul>
  );
};

//Проверка типов данных
IngredientsGroup.propTypes = {
  ingredientGroup: PropTypes.string.isRequired,
  onClickforInfo: PropTypes.func.isRequired,
};

export default IngredientsGroup;
