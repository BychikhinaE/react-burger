import { useEffect } from "react";
import styles from "./info-food.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CLOSE_MODAL } from "../services/actions/ingredient";

export function InfoFood() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const onClose = () => {
    history.replace({
      pathname: "/",
    });
    dispatch({ type: CLOSE_MODAL });
  };

  const items = useSelector((state) => state.menu.items);
  const ingredient = items.find((item) => item._id === id);
  //логика навешивания и удаления обработчиков события нажатия клавиши "Esc"
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

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
