import styles from "./statistics.module.css";

import {  useSelector } from "react-redux";


// Реализуйте вёрстку так, чтобы каждая из этих колонок содержала
// не более 10 записей. Если записей больше — создавайте дополнительную колонку.
function Statistics() {
  const { total, totalToday, orders } = useSelector((state) => state.ws);

  if (!orders) {
    return;
  }

  return (
    <>
      <div className={styles.gridStatus}>
        {/* <p className={`${styles.status__text} text text_type_main-medium`}>
            Готовы:
          </p> */}
        <ul
          className={`${styles.orders} ${styles.done}text text_type_digits-default`}
        >
          {orders.map(
            (item, index) =>
              item.status === "done" && <li key={index}>{item.number}</li>
          )}
        </ul>
        <ul
          className={`${styles.orders} ${styles.pending} text text_type_digits-default`}
        >
          {orders.map(
            (item, index) =>
              item.status === "pending" && (
                <li key={index} className="mb-2">
                  {item.number}
                </li>
              )
          )}
        </ul>
      </div>
      <div className={styles.gridTotal}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large mb-15">{total}</p>
      </div>
      <div className={styles.gridToday}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </>
  );
}

export default Statistics;
