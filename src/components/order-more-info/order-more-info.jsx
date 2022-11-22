import styles from "./order-more-info.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import {getDate} from '../../utils/utils'

function OrderMoreInfo() {
  const orders = useSelector((state) => state.ws.orders);
  const AllIngredients = useSelector((state) => state.menu.items);
  const { id } = useParams();

if (!orders ) {
  return;
}

 const  order = orders.find((item) => item._id === id);
 if (!order ) {
  return;
}
  // const orderIngredients = itemsMenu.filter((ingredient) => {
  //   return order.ingredients.some((id) => ingredient._id === id);
  // });
  // console.log(orderIngredients);

//   order.ingredients - массив айди ингредиента
//   itemsMenu - массив всех ингредиентов с полем _айди
// нужно создать массив ингредиентов на основе двух этих

const orderIngrCount = AllIngredients.reduce((prevVal,item)=>{
   order.ingredients.forEach(
    (id) => {
      if(item._id ===id){
        if (!prevVal.some((item)=> item._id === id)) {
          prevVal.push({
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1,
            _id: item._id,
          });
        } else {
          prevVal.find((item)=> item._id === id).quantity++
          // item.quantity++;
        }
        return prevVal;
      }
    })
    return prevVal;
}, []
)
console.log(orderIngrCount);

  // const orderIngrCount = orderIngredients.reduce((prevVal, item) => {
  //   if (!prevVal[item._id]) {
  //     prevVal.push({
  //       name: item.name,
  //       image: item.image,
  //       price: item.price,
  //       quantity: 1,
  //       _id: item._id,
  //     });
  //   } else {
  //     item.quantity++;
  //   }
  //   return prevVal;
  // }, []);

  const total = orderIngrCount.reduce((acc, item) => acc + item.price*item.quantity, 0);
  let status = "";
  const colorStatus =
    order.status === "done"
      ? (styles.done, (status = "Выполнен"))
      : order.status === "pending"
      ? (styles.pending, (status = "Готовится"))
      : order.status === "created"
      ? (styles.created, (status = "Создан"))
      : (styles.cancel, (status = "Отменен"));

  return (
    <>

      <h3 className={`${styles.header} text text_type_main-medium mb-3`}>
        {order.name}
      </h3>
      <p
        className={`${styles.status} ${colorStatus} text text_type_main-default`}
      >
        {status}
      </p>
      <h4 className={`${styles.header} text text_type_main-medium mt-15 mb-6`}>
        Состав:
      </h4>

      <ul className={`${styles.scroll} custom-scroll text`}>
        {orderIngrCount.map((item, index) => (
          <li key={index} className={styles.item}>
            <div className={`${styles.imageBorder} `}>
              <img alt={item.name} src={item.image} className={styles.image} />
            </div>

            <p className="text text_type_main-default pl-5">{item.name}</p>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-1">
                {item.quantity} x {item.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles.footer} mt-10`}>
        <p
          className={`${styles.timestamp}text text_type_digits-small text_color_inactive `}
        >
          {getDate(order)}
        </p>
        <p className={`${styles.total} text text_type_digits-default mr-1`}>
          {total}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </>
  );
}

export default OrderMoreInfo;
