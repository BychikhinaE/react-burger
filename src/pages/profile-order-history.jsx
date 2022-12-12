import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderPreview from "../components/order-preview/order-preview";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";
import styles from "./profile.module.css";
import { getCookie } from "../utils/utils";

export default function ProfileОrderHistory() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    dispatch(
      wsConnectionStart({
        token: `?token=${accessToken}`,
      })
    );
    return () => {
      dispatch(wsConnectionClosed());
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
