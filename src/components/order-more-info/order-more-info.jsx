import styles from "./order-more-info.module.css";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";

function OrderMoreInfo() {
  const orders = useSelector((state) => state.ws.orders);
  const itemsMenu = useSelector((state) => state.menu.items);
  // Только тут ай-ди заказа
  const { id } = useParams();
  const order = orders.find((item) => item._id === id);

  const orderIngredients = order.ingredients.filter((item) => {
    return item === itemsMenu._id;
  });

  const orderIngrCount = orderIngredients.reduce((prevVal, item) => {
    if (!prevVal[item]) {
      prevVal.item.quantity = 1;
    } else {
      prevVal.item.quantity++;
    }
    return prevVal;
  }, []);

  const total = orderIngredients.reduce((acc, item) => acc + item.price, 0);

  if (!orders) {
    return;
  }

  return (
    <>
      <p className="text text_type_digits-default mb-8 mt-6">{order.number}</p>
      <h3 className="text text_type_main-medium mb-15">{order.name}</h3>
      <div className={`${styles.status} text text_type_main-default`}>
        {order.status}
      </div>
      <h4 className="text text_type_main-medium mt-15 mb-2">Состав:</h4>
      {/* тут скrолл кстати */}
      <ul className={`${styles.scroll} custom-scroll text`}>
        {orderIngrCount.map((item, index) => (
          <li key={index}>
            <img alt={item.name} src={item.image} />
            <p className="text text_type_main-default pb-5">{item.name}</p>
            <div className={styles.price}>
              <p className="text text_type_digits-default pt-2 pb-3">
                {item.quantity} x {item.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles.footer}`}>
        <p className={`${styles.timestamp} text text_type_digits-default`}>
          {order.timestamp}</p>
        <p className={`${styles.total} text text_type_digits-default`}>{total}</p>
        <CurrencyIcon type="primary" />
      </div>
    </>
  );
}

export default OrderMoreInfo;
