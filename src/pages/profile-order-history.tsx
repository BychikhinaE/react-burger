import { useEffect } from "react";
import { useSelector, useDispatch } from "../services/hooks/hooks";
import OrderPreview from "../components/order-preview/order-preview";
import {
  wsConnectionStartUser,
  wsConnectionClosedUser,
} from "../services/actions/wsActions";
import styles from "./profile.module.css";

export default function ProfileОrderHistory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStartUser());
    return () => {
      dispatch(wsConnectionClosedUser());
    };
  }, []);

  const orders = useSelector((state) => state.ws.orders);

  if (!orders) {
    return;
  }

  const reversed = Array.from(orders).reverse();

  return (
    <section className={`${styles.history} mt-10`}>
      <ul className={`${styles.scroll} custom-scroll text`}>
        {reversed.map((item) => (
          <li key={item.number.toString()}>
            <OrderPreview order={item} isStatus={true} />
          </li>
        ))}
      </ul>
    </section>
  );
}
