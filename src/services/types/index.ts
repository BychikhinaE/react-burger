import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import store from '../store/store'
import {TWsActions } from './wsActions'
import { TConstructorActions} from './constructor'
import { TMenuActions} from './menu'
import { TOrderActions} from './order'
import {TPasswordActions} from './password'
import {TUserActions} from './user'

type TApplicationActions =
| TConstructorActions
| TMenuActions
| TOrderActions
| TPasswordActions
| TUserActions
| TWsActions;

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown,  TApplicationActions>;
