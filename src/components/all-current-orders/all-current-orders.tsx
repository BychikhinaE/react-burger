import styles from "./all-current-orders.module.css";
import { useSelector } from "../../services/hooks/hooks";
import OrderPreview from "../order-preview/order-preview";
import { IOrder } from "../../services/types/data";

function AllCurrentOrders() {
  const orders = useSelector((state) => state.ws.orders);
if(!orders){
return null;
}
  return (
    <section className={styles.gridArea}>
      <ul className={`${styles.scroll} custom-scroll`}>
        {orders &&
          orders.map((item: IOrder) => (
            <li key={item.number.toString()} className={styles.item}>
              <OrderPreview order={item} isStatus={false} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default AllCurrentOrders;
