import { useMemo, FC } from "react";
import { Loader } from "../loader/loader";
import { useSelector } from "'../../services/hooks/hooks'";
import BurgerIngredientMenu from "../burger-ingredient-menu/burger-ingredient-menu";
import styles from "./ingredients-group.module.css";

interface IIngredientsGroupProps {
  ingredientGroup: "bun" | "sauce" | "main";
  counters?: number;
}
const IngredientsGroup: FC<IIngredientsGroupProps> = ({
  ingredientGroup,
  counters,
}) => {
  const items = useSelector((state) => state.menu.items);
  const itemsRequest = useSelector((state) => state.menu.itemsRequest);

  const currentObject = useMemo(
    () => items.filter((item) => item.type === ingredientGroup),
    [ingredientGroup, items]
  );

  return itemsRequest ? (
    <Loader />
  ) : (
    <ul className={`${styles.list} pr-2 pl-4 `}>
      {currentObject.map((item) => (
        <BurgerIngredientMenu item={item} key={item._id} counters={counters} />
      ))}
    </ul>
  );
};

export default IngredientsGroup;
