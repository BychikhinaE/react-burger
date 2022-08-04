import React from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

//использован атрибут __v -как отметка о выборе
import arrayIngredients from "../../utils/data";
const ingredientsCheck = arrayIngredients.filter(
  (item) => item.__v > 0);
const bunsCheck = ingredientsCheck.filter(
  (item) => item.type === "bun"
);
const saucesCheck = ingredientsCheck.filter(
  (item) => item.type === "sauce"
);
const mainsCheck = ingredientsCheck.filter(
  (item) => item.type === "main"
);


//функция вернёт разметку ингредиента взависимости от переданных параметров
const returnIngredients = (
  item: {
    name: string;
    price: number;
    __v: number;
    image: string;
    type: string;
  },
  index: number | string | null,
  type: "top" | "bottom" | undefined,
  isLocked: boolean
) => {
  let halfBun = "";
  if (type === "top") {
    halfBun = " (верх)";
  }
  if (type === "bottom") {
    halfBun = " (низ)";
  }
  return (
    <li className={`${styles.item} text`} key={index}>
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

class BurgerConstructor extends React.Component {

  render(){
  return (
    <>
      <ul className={`${styles.gridConstr} text pl-4  mb-10`}>
        {bunsCheck.map((item) => {
          return returnIngredients(item, item.name + "-top", "top", true);
        })}

        <ul className={`${styles.scroll} custom-scroll text`}>
          {saucesCheck.map((item) => {
            const sauces: any[] = [];
            let i;
            for (i = item.__v; i > 0; i--) {
              sauces.push(
                returnIngredients(item, item.name + String(i), undefined, false)
              );
            }

            return sauces;
          })}

          {mainsCheck.map((item) => {
            const mains = [];
            let i;
            for (i = item.__v; i > 0; i--) {
              mains.push(
                returnIngredients(item, item.name + String(i), undefined, false)
              );
            }

            return mains;
          })}
        </ul>

        {bunsCheck.map((item) => {
          return returnIngredients(item, item.name + "-bottom", "bottom", true);
        })}
      </ul>

      <div className={`${styles.gridButton} pr-4`}>

        <p className="text text_type_digits-medium pr-3">{610}</p>
        <div className={`${styles.currencyIcon} pl-2 pr-10`}><CurrencyIcon type="primary" /></div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </>
  );
};
}

export default BurgerConstructor;
