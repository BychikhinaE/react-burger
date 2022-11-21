import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./info-food.module.css";
import OrderMoreInfo from "../components/order-more-info/order-more-info";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";
import { getCookie } from "../utils/utils";
import {  useRouteMatch } from "react-router-dom";

export function OrderMoreInfoPage() {

  //доделаеть стили

  const dispatch = useDispatch();
  const match = useRouteMatch();
  // const numberOrder = useSelector((state) => state.order.numberOrder);
  console.log(match);
  useEffect(() => {
    if (match.path === "/feed/:id") {
      dispatch(
        wsConnectionStart({
          token: `/all`,
        })
      );
    } else {
      const accessToken = getCookie("accessToken");
      dispatch(
        wsConnectionStart({
          token: `?token=${accessToken}`,
        })
      );
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, match]);

  return (
    <section
      aria-label="OrderMoreInfoPage"
      className={`${styles.wrapper} pb-10 container pr-10 pl-10`}
    >
      <h1 className={`text text_type_main-large pt-10 pb-5 ${styles.header}`}>
        {/* {numberOrder} */}
      </h1>
      <OrderMoreInfo />
    </section>
  );
}
