import styles from "./ingredient-details.module.css";
import { useSelector } from "../../services/hooks/hooks";
import { useParams } from "react-router-dom";
import { IIngredient } from "../../services/types/data";

function IngredientDetails() {
  const items = useSelector((state) => state.menu.items);
  const { id } = useParams<{id: string}>();
  const ingredient = items.find((item: IIngredient) => item._id === id);

  if (!ingredient) {
    return null;
  }
  return (
    <>
      <h2 className={`${styles.header} text text_type_main-large`}>Детали ингредиента</h2>
      <img
        alt={ingredient.name}
        src={ingredient.image_large}
        className={styles.image}
      />
      <h3 className="text text_type_main-medium mb-8 mt-5">
        {ingredient.name}
      </h3>
      <ul
        className={`${styles.tab} mb-15 text text_type_main-default text_color_inactive`}
      >
        <li className={`${styles.item} mr-5`}>
          <h4 className="text text_type_main-default mb-2">Калории,ккал</h4>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </li>
        <li className={`${styles.item} mr-5`}>
          <h4 className="text text_type_main-default mb-2">Белки, г</h4>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </li>
        <li className={`${styles.item} mr-5`}>
          <h4 className="text text_type_main-default mb-2">Жиры, г</h4>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </li>
        <li className={`${styles.item}`}>
          <h4 className="text text_type_main-default mb-2">Углеводы, г</h4>
          <p className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}

export default IngredientDetails;
