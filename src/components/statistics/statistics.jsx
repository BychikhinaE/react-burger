import styles from "./statistics.module.css";

import { useSelector } from "react-redux";

function Statistics() {
  const { total, totalToday, orders } = useSelector((state) => state.ws);

  if (!orders) {
    return;
  }

  const ordersDone = orders
    .filter((order) => order.status === "done")
    .splice(0, 2);
  const ordersDoneNumber = ordersDone.map((order) => order.number);
  const ordersPending = orders
    .filter((order) => order.status === "pending")
    .splice(0, 2);
  const ordersPendingNumber = ordersPending.map((order) => order.number);
  console.log(
    "Завершенные заказы",
    ordersDoneNumber,
    "В работе",
    ordersPendingNumber
  );

  return (
    <>
      <div className={styles.gridStatus}>
        <div>
          <p className={`${styles.status} text text_type_main-medium mb-6`}>
            Готовы:
          </p>
          <ul className={`${styles.orders} text text_type_digits-default`}>
            {ordersDone.map((item) => (
              <li key={item.number} className={`${styles.done} mr-5 mb-2`}>
                {item.number}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={`${styles.status} text text_type_main-medium mb-6`}>
            В работе:
          </p>
          <ul className={`${styles.orders} text text_type_digits-default`}>
            {ordersPending.map((item) => (
              <li key={item.number} className={`${styles.pending} mr-2`}>
                {item.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.gridTotal}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={styles.gridToday}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </>
  );
}

export default Statistics;
