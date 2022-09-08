import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
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

import { useDispatch, useSelector } from "react-redux";

import { Loader } from "../loader/loader";
import {
  TAB_SWITCH,
  GET_ITEM_FOR_VIEW,
  CLOSE_MODAL,
} from "../../services/actions/actions";

//ОСНОВНОЙ КОМПОНЕНТ, которй отрисует меню
const BurgerIngredients = () => {
  const dispatch = useDispatch();
  // Получим все карточки из хранилища
  const items = useSelector((state) => state.menu.items);

  //Настройка переключателя табов при скролле
  const currentTab = useSelector((state) => state.menu.currentTab);
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    document.getElementById("scroll").addEventListener("scroll", function () {
      const viewportCoords = document
        .getElementById("scroll")
        .getBoundingClientRect();

      if (isVisible(bunRef.current, viewportCoords)) {
        dispatch({
          type: TAB_SWITCH,
          value: "Булки",
        });
      }
      if (isVisible(sauceRef.current, viewportCoords)) {
        dispatch({
          type: TAB_SWITCH,
          value: "Соусы",
        });
      }
      if (isVisible(mainRef.current, viewportCoords)) {
        dispatch({
          type: TAB_SWITCH,
          value: "Начинки",
        });
      }
    });
  }, []);
  //Функция контролирует приближение начала раздела меню к родительской верхней рамке
  function isVisible(elem, viewportCoords) {
    let coordsChild = elem.getBoundingClientRect();
    return coordsChild.top <= viewportCoords.top + 250;
  }
  //Настройка пролистывания меню при клике на таб
  const onTabClick = (event) => {
    dispatch({
      type: TAB_SWITCH,
      value: event,
    });
    const element = document.getElementById(event);
    element.scrollIntoView({ behavior: "smooth" });
  };

  //Код модального окна
  const modalVisible = useSelector((state) => state.menu.modalVisible);
  const currenViewedItem = useSelector((state) => state.menu.currenViewedItem);

  const handleOpenModal = (Event) => {
    const targetIndex = Event.currentTarget.getAttribute("index");
    const target = items.find((item) => item._id === targetIndex);

    dispatch({ type: GET_ITEM_FOR_VIEW, item: target });
  };

  function handleCloseModal() {
    dispatch({ type: CLOSE_MODAL });
  }

  return (
    <>
      <section className={styles.gridIngred}>
        <nav className={`${styles.nav} text text_type_main-default pb-10`}>
          <Tab
            value="Булки"
            active={currentTab === "Булки"}
            onClick={onTabClick}
          >
            Булки
          </Tab>

          <Tab
            value="Соусы"
            active={currentTab === "Соусы"}
            onClick={onTabClick}
          >
            Соусы
          </Tab>

          <Tab
            value="Начинки"
            active={currentTab === "Начинки"}
            onClick={onTabClick}
          >
            Начинки
          </Tab>
        </nav>

        <div className={`${styles.scroll} custom-scroll`} id="scroll">
          <div ref={bunRef}>
            <h2 className="text text_type_main-medium pb-6" id="Булки">
              Булки
            </h2>
            <ReturnMenu
              ingredientGroup="bun"
              onClickforInfo={handleOpenModal}
            />
          </div>

          <div ref={sauceRef}>
            <h2 className="text text_type_main-medium pb-4" id="Соусы">
              Соусы
            </h2>
            <ReturnMenu
              ingredientGroup="sauce"
              onClickforInfo={handleOpenModal}
            />
          </div>

          <div ref={mainRef}>
            <h2 className="text text_type_main-medium pb-6" id="Начинки">
              Начинки
            </h2>
            <ReturnMenu
              ingredientGroup="main"
              onClickforInfo={handleOpenModal}
            />
          </div>
        </div>
      </section>

      {/* Модальное окно*/}
      <>
        {modalVisible && (
          <Modal header="Детали ингредиента" onClose={handleCloseModal}>
            <IngredientDetails ingredient={currenViewedItem} />
          </Modal>
        )}
      </>
    </>
  );
};

//Вспомогательный компонент вернет элементы меню по разделам
const ReturnMenu = ({ ingredientGroup, onClickforInfo }) => {
  const items = useSelector((state) => state.menu.items);
  const itemsRequest = useSelector((state) => state.menu.itemsRequest);

  const currentObject = items.filter((item) => item.type === ingredientGroup);

  return itemsRequest ? (
    <Loader size="large" />
  ) : (
    <ul className={`${styles.list} pr-2 pl-4 pb-10`}>
      {currentObject.map((item) => (
        <BurgerIngredient
          item={item}
          key={item._id}
          onClickforInfo={onClickforInfo}
        />
      ))}
    </ul>
  );
};

//DragSource
const BurgerIngredient = ({ item, onClickforInfo }) => {
  const selectedItems = useSelector((state) => state.menu.selectedItems);
  //Счетчик
  let count = 0;
  const currentId = item._id;
  if (selectedItems.length > 0) {
    selectedItems.forEach((item) => {
      if (item._id === currentId) {
        count++;
      }
    });
  }

  const currentType = item.type
  const [, dragRef] = useDrag({
    type: "items",
    item: { currentId, currentType },
  });

  return (
    <li
      className={`${styles.item} mb-10`}
      index={item._id}
      onClick={onClickforInfo}
      ref={dragRef}
    >
      {count !== 0 && <Counter count={count} size="default" />}
      <img alt={item.name} src={item.image} />
      <div className={styles.price}>
        <p
          className={`text text_type_digits-default pt-2 pb-3 ${styles.addInConstructor}`}
        >
          {item.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default pb-5">{item.name}</p>
    </li>
  );
};

//Проверка типов данных
ReturnMenu.propTypes = {
  ingredientGroup: PropTypes.string.isRequired,
  onClickforInfo: PropTypes.func.isRequired,
};

BurgerIngredient.propTypes = {
  item: ingredientPropTypes.isRequired,
  onClickforInfo: PropTypes.func.isRequired,
};
export default  React.memo(BurgerIngredients);
