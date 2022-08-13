import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

import PropTypes from "prop-types";
//Проверка типа внутреннего объекта массива данных
import ingredientPropTypes from "../../utils/ingredientPropTypes";

//Компонент вернёт разметку ингредиента взависимости от переданных параметров
function ReturnIngredients({ item, type, isLocked }) {
  let halfBun = "";
  if (type === "top") {
    halfBun = " (верх)";
  }
  if (type === "bottom") {
    halfBun = " (низ)";
  }
  console.log(item.price)
  return (
    <li className={`${styles.item} text`}>
      {item.type === "bun" ? (
        <div className={styles.emptyIcon}></div>
      ) : (
        <DragIcon type="primary" />
      )}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={`${item.name}${halfBun}`}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
};

//Проверка типа
// ReturnIngredients.propTypes = {
//   item: ingredientPropTypes.isRequired,
//   type: PropTypes.string,
//   isLocked: PropTypes.bool.isRequired,
// };

//Компонент вернет разметку,которая справа
function BurgerConstructor({ array }) {
  console.log(array)
  //Найти выбранный хлебушек-объект
  const bunCheck = array.find((item) => item.type === "bun" && item.__v > 0);

  //Найти массив выбранного инопланетного наполнителя
  const anotherIngredietsCheck = array.filter((item) => {
    return (
      (item.type === "sauce" && item.__v > 0) ||
      (item.type === "main" && item.__v > 0)
    );
  });

  const total = anotherIngredietsCheck.reduce(
    (acc, p) => acc + p.price * p.__v,
    bunCheck.price * 2
  );

  return (
  <>
       <ul className={`${styles.gridConstr} text pl-4  mb-10`}>
        <ReturnIngredients
          item={bunCheck}
          key={`${bunCheck._id}-top`}
          type="top"
          isLocked={true}
        />

        <ul className={`${styles.scroll} custom-scroll text`}>
          {anotherIngredietsCheck.reduce((insideBurger, item) => {
            for (let i = item.__v; i > 0; i--) {
              insideBurger.push(
                <ReturnIngredients
                  item={item}
                  key={`${item._id}-${i}`}
                  isLocked={false}
                />
              );
            }
            return insideBurger;
          }, [])}
        </ul>

        <ReturnIngredients
          item={bunCheck}
          key={`${bunCheck._id}-bottom`}
          type="bottom"
          isLocked={true}
        />
      </ul>

      <div className={`${styles.gridButton} pr-4`}>
        <p className="text text_type_digits-medium pr-3">{total}</p>
        <div className={`${styles.currencyIcon} pl-2 pr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </>)

};

//Проверка типа
BurgerConstructor.propTypes = {
  array: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerConstructor;
