import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const accessToken = getCookie("accessToken");
  useEffect(() => {
    dispatch(wsConnectionStart({
      token: `?token=${accessToken}`,
    }));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [accessToken, dispatch]);

  const orders = useSelector((state) => state.ws.orders);
  console.log(orders);
  if (!orders) {
    return;
  }
  //не работывавыет(((
  const reversed = orders.reverse()
  return (
    <section className={styles.history}>
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
