import React from "react";
import PropTypes from 'prop-types';

import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import arrayIngredients from "../../utils/data";
const buns = arrayIngredients.filter((item) => item.type === "bun");
const sauces = arrayIngredients.filter((item) => item.type === "sauce");
const mains = arrayIngredients.filter((item) => item.type === "main");

const returnMenu=(item: { __v: number; name: string ; image: string | undefined; price: any; }, index: React.Key | null )=>{
  return (
  <li className={`${styles.item} mb-10`} key={index}>
  {item.__v > 0 && <Counter count={item.__v} size="default" />}
  <img alt={item.name} src={item.image} />
  <div className={styles.price}>
    <p className="text text_type_digits-default pt-2 pb-3">{item.price}</p>
    <CurrencyIcon type="primary" />
  </div>
  <p className="text text_type_main-default pb-5">{item.name}</p>
</li>)
}

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("Булки");

  return (
    <>
      <h1
        className={`text text_type_main-large pt-10 pb-5 ${styles.gridTitle}`}
      >
        Соберите бургер
      </h1>
      <section className={styles.gridIngred}>
        <nav
          style={{ display: "flex" }}
          className="text text_type_main-default pb-10"
        >
          <a className={styles.link} href="#buns">
            <Tab
              value="Булки"
              active={current === "Булки"}
              onClick={setCurrent}
            >
              Булки
            </Tab>
          </a>
          <a className={styles.link} href="#souce">
            <Tab
              value="Соусы"
              active={current === "Соусы"}
              onClick={setCurrent}
            >
              Соусы
            </Tab>
          </a>
          <a className={styles.link} href="#mains">
            <Tab
              value="Начинки"
              active={current === "Начинки"}
              onClick={setCurrent}
            >
              Начинки
            </Tab>
          </a>
        </nav>
        <div className={`${styles.scroll} custom-scroll`}>
          <h2 className="text text_type_main-medium pb-6" id="buns">
            Булки
          </h2>
          <ul className={`${styles.list} pr-2 pl-4 `}>
            {buns.map((item, index) =>  returnMenu(item, index)
            )}
          </ul>

          <h2 className="text text_type_main-medium pb-4" id="souce">
            Соусы
          </h2>
          <ul className={`${styles.list} pr-2 pl-4 pb-10`}>
            {sauces.map((item, index) => returnMenu(item, index)
            )}
          </ul>

          <h2 className="text text_type_main-medium pb-6" id="mains">
            Начинки
          </h2>
          <ul className={`${styles.list} pr-2 pl-4 pb-10`}>
            {mains.map((item, index) => returnMenu(item, index)
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {

};
