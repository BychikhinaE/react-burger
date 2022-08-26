import React from "react";
//Context
import { ProductContext } from "../../services/productContext";
import { TotalPriceContext } from "../../services/totalPriceContext";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
// import arrayIngredients from "../../utils/data";

import {getData} from '../api'

function App() {
  const [arraySelected, setTotalPrice] = React.useState({arr:[], id: []});

  const [state, setState] = React.useState({
    isLoading: true,
    hasError: false,
    data: [],
  });


  React.useEffect(() => {
    getData()
    .then((data)=>{setState({ data: data.data, isLoading: false, hasError: false });})
    .catch((error) => {console.log("Произошла ошибка: ", error);
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
            <TotalPriceContext.Provider value={{ arraySelected, setTotalPrice }}>
              <BurgerIngredients />
              <BurgerConstructor />
            </TotalPriceContext.Provider>
          </ProductContext.Provider>
        )}
      </main>
    </div>
  );
}

export default App;
