import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
// import { ProductContext } from '../../services/productContext';
import { TotalPriceContext } from "../../services/totalPriceContext";
import {postOrder} from '../api'

//Проверка типа внутреннего объекта массива данных
import ingredientPropTypes from "../../utils/ingredientPropTypes";

//Модальное окно
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

//ОСНОВНОЙ КОМПОНЕНТ, который вернет разметку справа
function BurgerConstructor() {
  const { arraySelected } = React.useContext(TotalPriceContext);
  const array = arraySelected.arr;
  const idSelectedElements = arraySelected.id;

  React.useEffect(() => {
    console.log(arraySelected, array.length);
  }, [arraySelected]);

  //Мы еще не умеем отправлять и принимать заказ, поставила приветствие
  if (array.length > 0) {
    //Найти в массиве выбранную булку
    const bunCheck = array.find((item) => item.type === "bun");

    //Найти массив выбранного инопланетного наполнителя
    const anotherIngredietsCheck = array.filter((item) => {
      return item.type === "sauce" || item.type === "main";
    });

    //Сумма заказа
    const total = anotherIngredietsCheck.reduce(
      (acc, p) => acc + p.price,
      bunCheck.price * 2
    );

    return (
      <>
        <ul className={`${styles.gridConstr} text pl-4  mb-10`}>
          <ReturnIngredients
            item={bunCheck}
            key={`${bunCheck._id}-top`}
            type="top"
            isLocked={true}
          />

          <ul className={`${styles.scroll} custom-scroll text`}>
            {anotherIngredietsCheck.reduce((insideBurger, item) => {
              insideBurger.push(
                <ReturnIngredients
                  item={item}
                  key={`${item._id}`}
                  isLocked={false}
                />
              );

              return insideBurger;
            }, [])}
          </ul>

          <ReturnIngredients
            item={bunCheck}
            key={`${bunCheck._id}-bottom`}
            type="bottom"
            isLocked={true}
          />
        </ul>

        <Total total={total} idSelectedElements={idSelectedElements}/>
      </>
    );
  } else {
    return (
      <>
        <div className={`${styles.gridConstr} text text_type_main-large p-10`}>
          <h2>Добро пожаловать!</h2>
          <p>Готовы сделать заказ?</p>
        </div>
        <Total total="0" />
      </>
    );
  }
}

// //идентификтатор получим пока так, потом с сервера
// const getRandomNum = () => Math.floor(Math.random() * 1000000);

//Компонент кнопки ЗАКАЗА и здесь МОДАЛЬНОЕ окно
function Total({ total, idSelectedElements }) {
  // Код мод.окна
  const [state, setState] = React.useState({
    visible: false,
    identifier: "",
  });

  const handleOpenModal = () => {
    postOrder(idSelectedElements)
    .then((res)=>{
      // console.log(res, res.order, res.order.number)
    setState({ visible: true, identifier: res.order.number });}
    )
    .catch((error) => {console.log("Произошла ошибка: ", error);
    setState({ ...state, visible: false });
    });
    // setState({ visible: true, identifier: getRandomNum() });
  };

  function handleCloseModal() {
    setState({ visible: false, identifier: "" });
  }

  return (
    <>
      <div className={`${styles.gridButton} pr-4`}>
        <p className="text text_type_digits-medium pr-3">{total}</p>
        <div className={`${styles.currencyIcon} pl-2 pr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>

      {/* Модальное окно*/}
      <>
        {state.visible && (
          <Modal header="" onClose={handleCloseModal}>
            <OrderDetails identifier={state.identifier} />
          </Modal>
        )}
      </>
    </>
  );
}

//Вспомогательный компонент вернёт разметку ингредиента взависимости от переданных параметров
function ReturnIngredients({ item, type, isLocked }) {
  let halfBun = "";
  if (type === "top") {
    halfBun = " (верх)";
  }
  if (type === "bottom") {
    halfBun = " (низ)";
  }

  return (
    <li className={`${styles.item} text`}>
      {item.type === "bun" ? (
        <div className={styles.emptyIcon}></div>
      ) : (
        <DragIcon type="primary" />
      )}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={`${item.name}${halfBun}`}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
}

//Проверка типов данных
// ReturnIngredients.propTypes = {
//   item: ingredientPropTypes.isRequired,
//   type: PropTypes.string,
//   isLocked: PropTypes.bool.isRequired,
// };

// Total.propTypes = {
//   Total: PropTypes.number,
// };

// BurgerConstructor.propTypes = {
//   array: PropTypes.arrayOf(ingredientPropTypes.isRequired),
// };

export default BurgerConstructor;
