import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/ingredientPropTypes";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient-menu.module.css";
import { Link, useRouteMatch, useHistory, useParams, useLocation } from "react-router-dom";
import { useCallback} from 'react'
//DragSource
const BurgerIngredientMenu = ({ item,
   onClickforInfo,
   counters }) => {
  const currentItem = item;
  const currentId = item._id;
  const [, dragRef] = useDrag({
    type: "items",
    item: { currentItem },
  });
  // const history = useHistory();
  // const { url } = useRouteMatch();

  // const onClickforInfo = useCallback(
  //   () => {
  //       history.replace({ pathname: `/${currentId}` });
  //   },
  //   [currentId, history]
  // );

  const location = useLocation();

  return (
    <li
      className={`${styles.item} mb-10`}
      index={currentId}
      onClick={onClickforInfo}
      ref={dragRef}
      // to={{
      //   pathname: `/ingredients/${currentId}`,
      //   state: { background: location },
      // }}
    >
      {/* <Link to={{
          pathname: `/ingredients/${currentId}`,
          state: { background: location },
        }}
        className={styles.link}> */}
      {/* <Link to={{ pathname: `/${url}/${currentId}` }} className={styles.link}> */}
        {typeof counters[currentId] !== "undefined" && (
          <Counter count={counters[currentId]} size="default" />
        )}
        <img alt={item.name} src={item.image} />
        <div className={styles.price}>
          <p className="text text_type_digits-default pt-2 pb-3">
            {item.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default pb-5">{item.name}</p>
     </li>
    // </Link>
  );
};

BurgerIngredientMenu.propTypes = {
  item: ingredientPropTypes.isRequired,
  onClickforInfo: PropTypes.func.isRequired,
};

export default BurgerIngredientMenu;
