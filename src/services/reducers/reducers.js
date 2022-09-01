import {
  GET_SELECTEDITEM,
  INCREASE_ITEM,
DECREASE_ITEM,
DELETE_ITEM,

SET_SELECTEDITEM_REQUEST,
SET_SELECTEDITEM_SUCCESS,
SET_SELECTEDITEM_FAILED,

GET_ITEMS_REQUEST,
GET_ITEMS_SUCCESS,
GET_ITEMS_FAILED,
TAB_SWITCH,
GET_ITEM_FOR_VIEW,
CLOSE_MODAL,
CLOSE_MODAL_NUMBER,
GET_SELECTEDITEM_ID,
} from '../actions/actions';

// В хранилище должны быть:
// список всех полученных ингредиентов,
// список всех ингредиентов в текущем конструкторе бургера,
// объект текущего просматриваемого ингредиента,
// объект созданного заказа.
const initialState = {

// список всех полученных ингредиентов,
  items: [],
  itemsRequest: false,
  itemsFailed: false,
// список всех ингредиентов в текущем конструкторе бургера,
  selectedItems: [],
//Таблица переключений активного поля
  currentTab: "Булки",
// объект текущего просматриваемого ингредиента,
  currenViewedItem: {},
  modalVisible: false,
// объект созданного заказа
order: {
  idArray: [],
  numberOrder: NaN,
  modalVisible: false,
}
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.value
      };
    }

    case GET_SELECTEDITEM: {
      return { ...state,  selectedItems: [...state.selectedItems, action.item] };
    }
    case GET_SELECTEDITEM_ID: {
      return { ...state,  order: {...state.order, idArray: [...state.order.idArray, action.idItem]} };
    }

    case SET_SELECTEDITEM_REQUEST: {
      return { ...state,  itemsRequest: true };
    }

    // получить номер заказа
    case SET_SELECTEDITEM_SUCCESS: {
      return { ...state,  order: {...state.order, numberOrder: action.number, modalVisible: true}, itemsFailed: false, itemsRequest: false };
    }


    case SET_SELECTEDITEM_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    // case INCREASE_ITEM: {
    //   return {
    //     ...state,
    //     items: [...state.items].map(item =>
    //       item.id === action.id ? { ...item, qty: ++item.qty } : item
    //     )
    //   };
    // }
    // case DECREASE_ITEM: {
    //   return {
    //     ...state,
    //     items: [...state.items].map(item =>
    //       item.id === action.id ? { ...item, qty: --item.qty } : item
    //     )
    //   };
    // }
    // case DELETE_ITEM: {
    //   return { ...state, items: [...state.items].filter(item => item.id !== action.id) };
    // }

    case GET_ITEM_FOR_VIEW: {
      return {...state, currenViewedItem: action.item, modalVisible: true }
    }
    case CLOSE_MODAL: {
      return {...state, currenViewedItem: {}, modalVisible: false }
    }
    case CLOSE_MODAL_NUMBER: {
      return {...state,  order: {...state.order, modalVisible: false}, }
    }

    default: {
      return state;
    }
  }
};

