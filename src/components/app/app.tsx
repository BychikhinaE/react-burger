import React from "react";
//Context
import { ProductContext } from "../../services/productContext";
import { SelectedContext } from "../../services/selectedContext";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
//Функция запроса данных на сервер
import { getData } from "../../utils/api";

function App() {
  //Стейт для выбранных ингредиентов
  const [arraySelected, setArraySelected] = React.useState([]);
  //Стейт для загрузки ингредиентов с сервера
  const [state, setState] = React.useState({
    isLoading: true,
    hasError: false,
    data: [],
  });

  //Запрашиваем ингредиенты на сервере и передаем их в стейт
  React.useEffect(() => {
    getData()
      .then((data) => {
        setState({ data: data.data, isLoading: false, hasError: false });
      })
      .catch((error) => {
        console.log("Произошла ошибка: ", error);
        setState({ ...state, isLoading: false, hasError: true });
      });
  }, []);

  return (
    <div className="p-10">
      <AppHeader />
      <main className={styles.main}>
        <h1
          className={`text text_type_main-large pt-10 pb-5 ${styles.gridTitle}`}
        >
          Соберите бургер
        </h1>

        {state.isLoading && "Загрузка..."}
        {state.hasError && "Произошла ошибка"}
        {!state.isLoading && !state.hasError && state.data.length && (
          <ProductContext.Provider value={state.data}>
            <SelectedContext.Provider
              value={{ arraySelected, setArraySelected }}
            >
              <BurgerIngredients />
              <BurgerConstructor />
            </SelectedContext.Provider>
          </ProductContext.Provider>
        )}
      </main>
    </div>
  );
}

export default App;
