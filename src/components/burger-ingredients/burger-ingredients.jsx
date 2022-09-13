import React, { useEffect, useRef } from "react";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";

import { useDispatch, useSelector } from "react-redux";
import { TAB_NAME, INGREDIENT_TYPES } from "../../utils/constants";
import { TAB_SWITCH } from "../../services/actions/menu";
import {
  GET_ITEM_FOR_VIEW,
  CLOSE_MODAL,
} from "../../services/actions/ingredient";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import { getDistanceBetweenPoints } from "../../utils/utils";

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
  //Меняет активность у вкладок по мере скролла меню высчитывая самый близкий заголовок к верхней границе родителя
  function changeTab() {
    const viewportCoords = document
      .getElementById("scroll")
      .getBoundingClientRect();

    getDistanceBetweenPoints(bunRef.current, viewportCoords) <
    getDistanceBetweenPoints(sauceRef.current, viewportCoords)
      ? dispatch({
          type: TAB_SWITCH,
          value: TAB_NAME.BUN,
        })
      : getDistanceBetweenPoints(sauceRef.current, viewportCoords) <
        getDistanceBetweenPoints(mainRef.current, viewportCoords)
      ? dispatch({
          type: TAB_SWITCH,
          value: TAB_NAME.SAUCE,
        })
      : dispatch({
          type: TAB_SWITCH,
          value: TAB_NAME.MAIN,
        });
  }
  useEffect(() => {
    const scrollBlock = document.getElementById("scroll");
    scrollBlock.addEventListener("scroll", changeTab);
    return function cleanup() {
      scrollBlock.removeEventListener("scroll", changeTab);
    };
  }, []);

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
  const modalVisible = useSelector((state) => state.info.modalVisible);
  const currenViewedItem = useSelector((state) => state.info.currenViewedItem);

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
            value={TAB_NAME.BUN}
            active={currentTab === TAB_NAME.BUN}
            onClick={onTabClick}
          >
            Булки
          </Tab>

          <Tab
            value={TAB_NAME.SAUCE}
            active={currentTab === TAB_NAME.SAUCE}
            onClick={onTabClick}
          >
            Соусы
          </Tab>

          <Tab
            value={TAB_NAME.MAIN}
            active={currentTab === TAB_NAME.MAIN}
            onClick={onTabClick}
          >
            Начинки
          </Tab>
        </nav>

        <div className={`${styles.scroll} custom-scroll`} id="scroll">
          <div ref={bunRef}>
            <h2 className="text text_type_main-medium pb-6" id={TAB_NAME.BUN}>
              Булки
            </h2>
            <IngredientsGroup
              ingredientGroup={INGREDIENT_TYPES.BUN}
              onClickforInfo={handleOpenModal}
            />
          </div>

          <div ref={sauceRef}>
            <h2 className="text text_type_main-medium pb-4" id={TAB_NAME.SAUCE}>
              Соусы
            </h2>
            <IngredientsGroup
              ingredientGroup={INGREDIENT_TYPES.SAUCE}
              onClickforInfo={handleOpenModal}
            />
          </div>

          <div ref={mainRef}>
            <h2 className="text text_type_main-medium pb-6" id={TAB_NAME.MAIN}>
              Начинки
            </h2>
            <IngredientsGroup
              ingredientGroup={INGREDIENT_TYPES.MAIN}
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

export default React.memo(BurgerIngredients);
