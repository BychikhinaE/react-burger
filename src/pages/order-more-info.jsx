import { useDispatch, useSelector } from "react-redux";

import styles from "./info-food.module.css";
import OrderMoreInfo from "../components/order-more-info/order-more-info";

export function OrderMoreInfoPage() {
  const numberOrder = useSelector((state) => state.order.numberOrder);

  return (
    <section
      aria-label="OrderMoreInfoPage"
      className={`${styles.wrapper} pb-10 container pr-10 pl-10`}
    >
      <h1 className={`text text_type_main-large pt-10 pb-5 ${styles.header}`}>
        {numberOrder}
      </h1>
      <OrderMoreInfo />
    </section>
  );
}
