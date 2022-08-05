import React from 'react';

import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import arrayIngredients from "./utils/data";

function App() {
  return (
    <div className="p-10">
    <AppHeader/>
    <main className="main">
    <BurgerIngredients array={arrayIngredients}/>
    <BurgerConstructor array={arrayIngredients}/>
    </main>

    </div>
  );
}

export default App;
