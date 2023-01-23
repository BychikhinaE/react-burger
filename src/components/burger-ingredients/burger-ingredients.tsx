import React, { useEffect, useRef, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useDispatch, useSelector } from "'../../services/hooks/hooks'";
import { TAB_NAME, INGREDIENT_TYPES } from "../../utils/constants";
import { TAB_SWITCH } from "../../services/actions/menu";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import { getDistanceBetweenPoints } from "../../utils/utils";
import { TTabSwitchName } from "../../services/types/menu";

//ОСНОВНОЙ КОМПОНЕНТ, которй отрисует меню
const BurgerIngredients = () => {
  const dispatch = useDispatch();

  //Настройка переключателя табов при скролле
  const currentTab = useSelector((state) => state.menu.currentTab);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
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
  const onTabClick = (event: TTabSwitchName) => {
    dispatch({
      type: TAB_SWITCH,
      value: event,
    });
    const element = document.getElementById(event);
    element.scrollIntoView({ behavior: "smooth" });
  };

  //Счетчик заказанных ингридиентов, потом пробросим пропсами до каждой карточки
  const selectedItems = useSelector((state) => state.constr.selectedItems);
  const counters = useMemo(
    () =>
      selectedItems.reduce((prevVal, item) => {
        if (!prevVal[item._id]) {
          if (item.type === INGREDIENT_TYPES.BUN) {
            prevVal[item._id] = 2;
          } else {
            prevVal[item._id] = 1;
          }
        } else {
          prevVal[item._id]++;
        }
        return prevVal;
      }, {}),
    [selectedItems]
  );

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
              counters={counters}
            />
          </div>

          <div ref={sauceRef}>
            <h2 className="text text_type_main-medium pb-4" id={TAB_NAME.SAUCE}>
              Соусы
            </h2>
            <IngredientsGroup
              ingredientGroup={INGREDIENT_TYPES.SAUCE}
              counters={counters}
            />
          </div>

          <div ref={mainRef}>
            <h2 className="text text_type_main-medium pb-6" id={TAB_NAME.MAIN}>
              Начинки
            </h2>
            <IngredientsGroup
              ingredientGroup={INGREDIENT_TYPES.MAIN}
              counters={counters}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(BurgerIngredients);
