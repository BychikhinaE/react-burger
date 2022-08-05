import React from "react";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import arrayIngredients from "../../utils/data";

function App() {
  return (
    <div className="p-10">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients array={arrayIngredients} />
        <BurgerConstructor array={arrayIngredients} />
      </main>
    </div>
  );
}

export default App;
