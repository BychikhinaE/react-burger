import { useDispatch, useSelector } from "react-redux";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { Loader } from "../components/loader/loader";
//DndProvider
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./constructor.module.css";

export function ConstructorPage (){
  const itemsRequest = useSelector((state) => state.menu.itemsRequest);
  return (
    <section
          aria-label="constructor-page"
          className={`${styles.grid} pb-10 container pr-10 pl-10`}
        >
          <h1
            className={`text text_type_main-large pt-10 pb-5 ${styles.gridTitle}`}
          >
            Соберите бургер
          </h1>
          <DndProvider backend={HTML5Backend}>
            {itemsRequest ? <Loader size="large" /> : <BurgerIngredients />}
            <BurgerConstructor />
          </DndProvider>
        </section>
  )
}
