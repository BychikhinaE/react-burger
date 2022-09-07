import React, { useEffect, useMemo } from "react";
//DndProvider

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Loader } from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/actions/actions";

function App() {
  const dispatch = useDispatch();
  const itemsRequest = useSelector((state) => state.menu.itemsRequest);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div className="p-10">
      <AppHeader />
      <main className={styles.main}>
        <h1
          className={`text text_type_main-large pt-10 pb-5 ${styles.gridTitle}`}
        >
          Соберите бургер
        </h1>
        <DndProvider backend={HTML5Backend}>
        {itemsRequest ? <Loader size="large" /> : <BurgerIngredients />}
        <BurgerConstructor />
        </DndProvider>

      </main>
    </div>
  );
}

export default React.memo(App);
