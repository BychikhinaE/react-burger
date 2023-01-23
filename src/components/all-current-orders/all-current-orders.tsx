import styles from "./all-current-orders.module.css";
import { useSelector } from "../../services/hooks/hooks";
import OrderPreview from "../order-preview/order-preview";

function AllCurrentOrders() {
  const orders = useSelector((state) => state.ws.orders);

  return (
    <section className={styles.gridArea}>
      <ul className={`${styles.scroll} custom-scroll`}>
        {orders &&
          orders.map((item) => (
            <li key={item.number.toString()} className={styles.item}>
              <OrderPreview order={item} isStatus={false} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default AllCurrentOrders;
