import {AppDispatch, AppThunk, RootState} from "../types/index";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook} from "react-redux";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
// export const useDispatch: () => AppDispatch = dispatchHook
// useDispatch = () => dispatchHook<AppDispatch>();
