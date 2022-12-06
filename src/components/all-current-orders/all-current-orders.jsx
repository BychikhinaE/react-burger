import styles from "./all-current-orders.module.css";
import { useSelector } from "react-redux";
import OrderPreview from "../order-preview/order-preview";

function AllCurrentOrders() {
  const orders = useSelector((state) => state.ws.orders);

  return (
    <section className={styles.gridArea}>
      <ul className={`${styles.scroll} custom-scroll`}>
        {orders &&
          orders.map((item, index) => (
            <li key={index} className={styles.item}>
              <OrderPreview order={item} isStatus={false} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default AllCurrentOrders;
