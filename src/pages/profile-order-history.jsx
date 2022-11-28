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

  const wsConnected = useSelector((state)=> state.ws.wsConnected)

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    dispatch(
      wsConnectionStart({
        token: `?token=${accessToken}`,
      })
    );
    return () => {
      if(wsConnected)
      {dispatch(wsConnectionClosed());}
    };
  }, [dispatch, wsConnected]);

  const orders = useSelector((state) => state.ws.orders);

  if (!orders) {
    return;
  }

  const reversed = Array.from(orders).reverse();

  return (
    <section className={`${styles.history} mt-10`}>
      <ul className={`${styles.scroll} custom-scroll text`}>
        {reversed.map((item, index) => (
          <li key={index}>
            <OrderPreview order={item} isStatus={true} />
          </li>
        ))}
      </ul>
    </section>
  );
}
