import React from "react";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import arrayIngredients from "../../utils/data";
const API = "https://norma.nomoreparties.space/api/ingredients ";

function App() {
  const [state, setState] = React.useState({
    isLoading: true,
    hasError: false,
    data: [],
  });

  const getData = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) {
        setState({ ...state, isLoading: false, hasError: true });
        throw `Ошибка ${res.status}`;
      }
      const data = await res.json();
      setState({ data: data.data, isLoading: false, hasError: false });
    }
    catch (error) {
      console.log('Произошла ошибка: ', error);
      setState({ ...state, isLoading: false, hasError: true });
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-10">
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && "Загрузка..."}
        {state.hasError && "Произошла ошибка"}
        {!state.isLoading && !state.hasError && state.data.length && (
          <>
            <BurgerIngredients array={state.data} />
            <BurgerConstructor array={arrayIngredients} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
