import { useEffect } from "react";
import { useSelector, useDispatch } from "../services/hooks/hooks";
import OrderPreview from "../components/order-preview/order-preview";
import {
  wsConnectionStartUser,
  wsConnectionClosedUser,
} from "../services/actions/wsActions";
import styles from "./profile.module.css";
import { IOrder } from "../services/types/data";

export default function ProfileОrderHistory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStartUser());
    return () => {
      dispatch(wsConnectionClosedUser());
    };
  }, []);

  const orders: Array<IOrder> = useSelector((state) => state.ws.orders);

  if (!orders) {
    return null;
  }

  const reversed: Array<IOrder> = Array.from(orders).reverse();

  return (
    <section className={`${styles.history} mt-10`}>
      <ul className={`${styles.scroll} custom-scroll text`}>
        {reversed.map((item: IOrder) => (
          <li key={item.number.toString()}>
            <OrderPreview order={item} isStatus={true} />
          </li>
        ))}
      </ul>
    </section>
  );
}
