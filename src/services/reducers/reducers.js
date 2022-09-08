import {
  GET_SELECTED_ITEM,
  DELETE_ITEM,
  SET_SELECTEDITEM_REQUEST,
  SET_SELECTEDITEM_SUCCESS,
  SET_SELECTEDITEM_ERROR,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  TAB_SWITCH,
  GET_ITEM_FOR_VIEW,
  CLOSE_MODAL,
  CLOSE_MODAL_ORDER,
  UPDATE_TOTAL,
  UPDATE_LIST,
} from "../actions/actions";

const initialState = {
  // список всех полученных с сервера ингредиентов,
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
    numberOrder: NaN,
    modalVisible: false,
    total: "0",
    idSet: [],
  },
  orderRequest: false,
  orderFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_ERROR: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.value,
      };
    }

    case GET_SELECTED_ITEM: {
      return {
        ...state,
        selectedItems: [
          ...state.selectedItems,
          state.items.find((item) => item._id === action.id),
        ],
      };
    }

    case SET_SELECTEDITEM_REQUEST: {
      return { ...state, orderRequest: true };
    }

    // получить номер заказа
    case SET_SELECTEDITEM_SUCCESS: {
      return {
        ...state,
        order: {
          ...state.order,
          numberOrder: action.number,
          modalVisible: true,
        },
        orderFailed: false,
        orderRequest: false,
      };
    }

    case SET_SELECTEDITEM_ERROR: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case DELETE_ITEM: {
      return {
        ...state,
        selectedItems: [...state.selectedItems].filter(
          (item, index) => index !== action.index
        ),
      };
    }

    case GET_ITEM_FOR_VIEW: {
      return { ...state, currenViewedItem: action.item, modalVisible: true };
    }
    case CLOSE_MODAL: {
      return { ...state, currenViewedItem: {}, modalVisible: false };
    }
    case CLOSE_MODAL_ORDER: {
      return { ...state, order: { ...state.order, modalVisible: false } };
    }

    case UPDATE_TOTAL: {
      return {
        ...state,
        order: {
          ...state.order,
          idSet: state.selectedItems.map((item) => item._id),
          total: state.selectedItems.reduce(
            (acc, item) => acc + item.price,
            state.selectedItems.find((item) => item.type === "bun").price
          ),
        },
      };
    }

    case UPDATE_LIST: {
      state.selectedItems[action.dragIndex] = action.hoverItem;
      state.selectedItems[action.hoverIndex] = action.dragItem;
      return {
        ...state,
        selectedItems: [...state.selectedItems],
      };
    }

    default: {
      return state;
    }
  }
};
