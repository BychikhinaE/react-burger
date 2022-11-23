import styles from "./statistics.module.css";

import { useSelector } from "react-redux";

function Statistics() {
  const { total, totalToday, orders } = useSelector((state) => state.ws);

  if (!orders) {
    return;
  }

  return (
    <>
      <div className={styles.gridStatus}>
        <div>
          <p className={`${styles.status} text text_type_main-medium mb-6`}>
            Готовы:
          </p>
          <ul className={`${styles.orders} text text_type_digits-default`}>
            {orders.map(
              (item, index) =>
                item.status === "done" && (
                  <li key={index} className={`${styles.done} mr-5 mb-2`}>
                    {item.number}
                  </li>
                )
            )}
          </ul>
        </div>
        <div>
          <p className={`${styles.status} text text_type_main-medium`}>
            В работе:
          </p>
          <ul className={`${styles.orders} text text_type_digits-default`}>
            {orders.map(
              (item, index) =>
                item.status === "pending" && (
                  <li key={index} className={`${styles.pending} mr-2`}>
                    {item.number}
                  </li>
                )
            )}
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
