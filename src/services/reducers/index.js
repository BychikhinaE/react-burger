import { combineReducers } from 'redux';
import  {burgerIngredientsReducer } from './reducers'

export const rootReducer= combineReducers({
  menu: burgerIngredientsReducer,
})

