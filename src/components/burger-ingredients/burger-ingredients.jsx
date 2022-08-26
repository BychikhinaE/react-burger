import React from "react";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/ingredientPropTypes";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { ProductContext } from "../../services/productContext";
import { SelectedContext } from "../../services/selectedContext";

//ОСНОВНОЙ КОМПОНЕНТ, которй отрисует меню
const BurgerIngredients = () => {
  //принимает контекст всех ингредиентов с сервера
  const array = React.useContext(ProductContext);
  //влияет на контекст выбранных ингредиентов
  const { setArraySelected } = React.useContext(SelectedContext);
  //стейт компонента Tab
  const [current, setCurrent] = React.useState("Булки");

  //Код добавления ингредиента в конструктор
  function onClickforBuy(event) {
    event.stopPropagation();
    dispatch(event);
  }

  //Здесь собираются в массив selectedIngrdnts выбранные ингредиенты и обновляется контекст setArraySelected
  function reducer(selectedIngrdnts, event) {
    const idElement = event.target.offsetParent.getAttribute("index");

    const selectedIngrdnt = array.find((item) => item._id === idElement);

    //Проверим что ингредиент - булка и удалим в массиве хлеб, если он там был
    if (
      (selectedIngrdnt.type === "bun") &
      selectedIngrdnts.some((item) => item.type === "bun")
    ) {
      const bunIndex = selectedIngrdnts.findIndex(
        (item) => item.type === "bun"
      );
      selectedIngrdnts.splice(bunIndex, 1);
    }

    return [...selectedIngrdnts, selectedIngrdnt];
  }
  const [selectedIngrdnts, dispatch] = React.useReducer(reducer, []);

  React.useEffect(() => {
    setArraySelected(selectedIngrdnts);
  }, [selectedIngrdnts, setArraySelected]);

  // Код мод.окна просмотра полной информации об ингредиенте
  const [state, setState] = React.useState({
    visible: false,
    ingredient: {},
  });

  const handleOpenModal = (Event) => {
    const targetIndex = Event.currentTarget.getAttribute("index");
    const target = array.find((item) => item._id === targetIndex);
    setState({ visible: true, ingredient: target });
  };

  function handleCloseModal() {
    setState({ visible: false, ingredient: {} });
  }

  return (
    <>
      <section className={styles.gridIngred}>
        <nav className={`${styles.nav} text text_type_main-default pb-10`}>
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
          <ReturnMenu
            array={array}
            ingredientGroup="bun"
            onClickforInfo={handleOpenModal}
            onClickforBuy={onClickforBuy}
          />

          <h2 className="text text_type_main-medium pb-4" id="souce">
            Соусы
          </h2>
          <ReturnMenu
            array={array}
            ingredientGroup="sauce"
            onClickforInfo={handleOpenModal}
            onClickforBuy={onClickforBuy}
          />

          <h2 className="text text_type_main-medium pb-6" id="mains">
            Начинки
          </h2>
          <ReturnMenu
            array={array}
            ingredientGroup="main"
            onClickforInfo={handleOpenModal}
            onClickforBuy={onClickforBuy}
          />
        </div>
      </section>

      {/* Модальное окно*/}
      <>
        {state.visible && (
          <Modal header="Детали ингредиента" onClose={handleCloseModal}>
            <IngredientDetails ingredient={state.ingredient} />
          </Modal>
        )}
      </>
    </>
  );
};

//Вспомогательный компонент вернет элементы меню по разделам
const ReturnMenu = ({
  array,
  ingredientGroup,
  onClickforInfo,
  onClickforBuy,
}) => {
  const currentObject = array.filter((item) => item.type === ingredientGroup);

  return (
    <ul className={`${styles.list} pr-2 pl-4 pb-10`}>
      {currentObject.map((item) => (
        <li
          className={`${styles.item} mb-10`}
          key={item._id}
          index={item._id}
          onClick={onClickforInfo}
        >
          {/* <Counter count={0} size="default" /> */}
          <img alt={item.name} src={item.image} />
          {/* В ТЗ пока нет указаний как будет добавляться ингредиент в конструктор и
          этот onClick={onClickforBuy} временное решение */}
          <div className={styles.price} title="Клик!">
            <p
              className={`text text_type_digits-default pt-2 pb-3 ${styles.addInConstructor}`}
              onClick={onClickforBuy}
            >
              {item.price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <p className="text text_type_main-default pb-5">{item.name}</p>
        </li>
      ))}
    </ul>
  );
};

//Проверка типов данных
ReturnMenu.propTypes = {
  array: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  ingredientGroup: PropTypes.string.isRequired,
  onClickforInfo: PropTypes.func.isRequired,
  onClickforBuy: PropTypes.func.isRequired,
};

export default BurgerIngredients;
