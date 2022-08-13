import React from "react";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
//import arrayIngredients from "../../utils/data";
const API = "https://norma.nomoreparties.space/api/ingredients ";


function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });


const getData = async () => {
    setState({ ...state, isLoading: true });
    const res = await fetch(API);
    const data = await res.json();
    console.log(data);
    if(data.success){
      setState({ data: data.data, isLoading: false, hasError: false })
    } else {setState({ ...state,  isLoading: false, hasError: true })}

  }


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
            {/* <BurgerConstructor array={state.data} /> */}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
