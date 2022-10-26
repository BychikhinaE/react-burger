import styles from "./all-current-orders.module.css";
import { useSelector } from "react-redux";
import OrderPreview  from '../order-preview/order-preview'

//ОСНОВНОЙ КОМПОНЕНТ, которй отрисует меню
function AllCurrentOrders() {
  const orders = useSelector((state) => state.ws.orders);

  if (!orders) {
    return
  }

  return (
      <section className={styles.gridArea}>
        <ul className={`${styles.scroll} custom-scroll`} id="scroll">
        {orders.map((item) => (
          <li key={item._id}>
            <OrderPreview order={item} isStatus={false}/>
          </li>
        ))}
        </ul>
      </section>

  );
};

export default AllCurrentOrders;