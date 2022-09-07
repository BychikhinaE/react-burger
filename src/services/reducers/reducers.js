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
  CLOSE_MODAL_NUMBER,

} from "../actions/actions";
// Для каждого экшена, который связан с запросом к API создан усилитель.
// Для таких экшенов описан тип
// _REQUEST , тип _SUCCESS , _ERROR .


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
  },
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
      //return { ...state, selectedItems: [...state.selectedItems, action.item] };
      return { ...state, selectedItems: [...state.selectedItems, state.items.find(item => item._id === action.id)] };
    }


    case SET_SELECTEDITEM_REQUEST: {
      return { ...state, itemsRequest: true };
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
        itemsFailed: false,
        itemsRequest: false,
      };
    }

    case SET_SELECTEDITEM_ERROR: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }


    case DELETE_ITEM: {
      return { ...state, selectedItems: [...state.selectedItems].filter(item => item._id !== action.id) };
    }

    case GET_ITEM_FOR_VIEW: {
      return { ...state, currenViewedItem: action.item, modalVisible: true };
    }
    case CLOSE_MODAL: {
      return { ...state, currenViewedItem: {}, modalVisible: false };
    }
    case CLOSE_MODAL_NUMBER: {
      return { ...state, order: { ...state.order, modalVisible: false } };
    }



    default: {
      return state;
    }
  }
};
 // const onClickforBuy = (event) => {
  //   event.stopPropagation();
  //   const idElement = event.target.offsetParent.getAttribute("index");
  //   const selectedIngrdnt = items.find((item) => item._id === idElement);
  //   //Проверим что ингредиент - булка и удалим в массиве хлеб, если он там был
  //   if (
  //     (selectedIngrdnt.type === "bun") &
  //     selectedItems.some((item) => item.type === "bun")
  //   ) {
  //     const bunIndex = selectedItems.findIndex((item) => item.type === "bun");
  //     selectedItems.splice(bunIndex, 1);
  //   }

  //   dispatch({ type: GET_SELECTEDITEM, item: selectedIngrdnt });
  //   dispatch({ type: GET_SELECTEDITEM_ID, idItem: selectedIngrdnt._id });
  // };

  // case ADD_SELECTED_ITEM: {
  //   return {
  //     ...state,
  //     postponed: [...state.postponed, ...state.items.filter(item => item.id === action.id)]
  //   };
  // }
  // case DELETE_POSTPONED_ITEM: {
  //   return { ...state, postponed: [...state.postponed].filter(item => item.id !== action.id) };
  // }
