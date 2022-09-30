import styles from "./info-food.module.css";
import { useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function InfoFood() {
  const { id } = useParams();
  // const { url } = useRouteMatch();
  // console.log(id, url);
  const items = useSelector((state) => state.menu.items);
  const ingredient = items.find((item) => item._id === id);

  return (
    <div className={`${styles.wrapper} pt-15 pl-10 pr-10`}>
      <div className={`${styles.container} mb-3`}>
        <h1 className="text text_type_main-large">Детали ингредиента</h1>

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
            <p className="text text_type_digits-default">
              {ingredient.calories}
            </p>
          </li>
          <li className={`${styles.item} mr-5`}>
            <h4 className="text text_type_main-default mb-2">Белки, г</h4>
            <p className="text text_type_digits-default">
              {ingredient.proteins}
            </p>
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
      </div>
    </div>
  );
}
