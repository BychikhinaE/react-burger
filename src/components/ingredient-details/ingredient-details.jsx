import styles from "./ingredient-details.module.css";
import ingredientPropTypes from "../../utils/ingredientPropTypes";
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function IngredientDetails(

  ) {
  //   const {itemId } = useParams();
  //   const items = useSelector((state) => state.menu.items);
  // const ingredient = items.find((item)=> item._id === itemId)
  // const { url } = useRouteMatch();
  // console.log(url)
  // const {id } = useParams();
  // console.log(id)
  const ingredient = useSelector((state) => state.info.currenViewedItem);
  return (
    <>
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

//проверкa типов
// IngredientDetails.propTypes = {
//   ingredient: ingredientPropTypes.isRequired,
// };

export default IngredientDetails;
