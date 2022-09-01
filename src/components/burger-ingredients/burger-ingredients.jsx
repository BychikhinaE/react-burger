import React, { useEffect, useMemo, useRef } from "react";
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
import { getItems } from "../../services/actions/actions";
import { Loader } from "../loader/loader";
import {
  TAB_SWITCH,
  GET_SELECTEDITEM,
  GET_ITEM_FOR_VIEW,
  CLOSE_MODAL,
  GET_SELECTEDITEM_ID,
} from "../../services/actions/actions";

//ОСНОВНОЙ КОМПОНЕНТ, которй отрисует меню
const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.menu.items);
  const currentTab = useSelector((state) => state.menu.currentTab);

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    document.getElementById("scroll").addEventListener("wheel", function () {
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

  function isVisible(elem, viewportCoords) {
    let coordsChild = elem.getBoundingClientRect();
    return coordsChild.top <= viewportCoords.top + 250;
  }

  const onTabClick = (event) => {
    dispatch({
      type: TAB_SWITCH,
      value: event,
    });
    const element = document.getElementById(event);
    element.scrollIntoView({ behavior: "smooth" });
  };
  const selectedItems = useSelector((state) => state.menu.selectedItems);

  const onClickforBuy = (event) => {
    event.stopPropagation();
    const idElement = event.target.offsetParent.getAttribute("index");
    const selectedIngrdnt = items.find((item) => item._id === idElement);
    //Проверим что ингредиент - булка и удалим в массиве хлеб, если он там был
    if (
      (selectedIngrdnt.type === "bun") &
      selectedItems.some((item) => item.type === "bun")
    ) {
      const bunIndex = selectedItems.findIndex((item) => item.type === "bun");
      selectedItems.splice(bunIndex, 1);
    }

    dispatch({ type: GET_SELECTEDITEM, item: selectedIngrdnt });
    dispatch({ type: GET_SELECTEDITEM_ID, idItem: selectedIngrdnt._id });
  };

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
              onClickforBuy={onClickforBuy}
            />
          </div>

          <div ref={sauceRef}>
            <h2 className="text text_type_main-medium pb-4" id="Соусы">
              Соусы
            </h2>
            <ReturnMenu
              ingredientGroup="sauce"
              onClickforInfo={handleOpenModal}
              onClickforBuy={onClickforBuy}
            />
          </div>

          <div ref={mainRef}>
            <h2 className="text text_type_main-medium pb-6" id="Начинки">
              Начинки
            </h2>
            <ReturnMenu
              ingredientGroup="main"
              onClickforInfo={handleOpenModal}
              onClickforBuy={onClickforBuy}
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
const ReturnMenu = ({ ingredientGroup, onClickforBuy, onClickforInfo }) => {
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
          onClickforBuy={onClickforBuy}
        />
      ))}
    </ul>
  );
};

const BurgerIngredient = ({ item, onClickforInfo, onClickforBuy }) => {
  const selectedItems = useSelector((state) => state.menu.selectedItems);

  let count = 0;
  if (selectedItems) {
    selectedItems.forEach((elem) => {
      if (elem._id === item._id) {
        count++;
      }
    });
  }

  return (
    <li
      className={`${styles.item} mb-10`}
      index={item._id}
      onClick={onClickforInfo}
    >
      {count !== 0 && <Counter count={count} size="default" />}
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
  );
};

//Проверка типов данных
// ReturnMenu.propTypes = {
//   array: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
//   ingredientGroup: PropTypes.string.isRequired,
//   onClickforInfo: PropTypes.func.isRequired,
//   onClickforBuy: PropTypes.func.isRequired,
// };

//export default React.memo(BurgerIngredients);

export default BurgerIngredients;
