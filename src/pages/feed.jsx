import { useDispatch, useSelector } from "react-redux";
import AllCurrentOrders from "../components/all-current-orders/all-current-orders";
import InfoAllOrders from "../components/info-all-orders/info-all-orders";
import styles from "./feed.module.css";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Modal from "../modal/modal.jsx";
import OrderMoreInfo from "../components/order-more-info/order-more-info";

export function FeedPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const onClose = () => {
    history.goBack();
  };
  const background = location.state && location.state.background;

  return (
    <section
      aria-label="feed-page"
      className={`${styles.grid} pb-10 container pr-10 pl-10`}
    >
      <h1
        className={`text text_type_main-large pt-10 pb-5 ${styles.gridTitle}`}
      >
        Лента заказов
      </h1>
      <AllCurrentOrders />
      <InfoAllOrders />
      {background && (
          <Route path="/ingredients/:id">
            <Modal onClose={onClose} >
              <OrderMoreInfo />
            </Modal>
          </Route>
        )}
    </section>
  );
}
