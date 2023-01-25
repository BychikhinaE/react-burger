import { useHistory, useLocation } from "react-router-dom";
import { TLocation } from "../services/types/data";
import styles from "./not-found.module.css";
import gif from "../images/404.gif";

export const NotFound404 = () => {
  const hist = useHistory();
  const location = useLocation<TLocation>();
  return (
    <div className={`${styles.container} pl-10 pr-10`}>
      <h1
        className={`${styles.head} text text_type_main-default text_color_inactive`}
      >
        No match for <code>{location.pathname}</code>
      </h1>
      <img src={gif} alt="Страницы не существует" className={styles.gif}></img>
      <button onClick={() => hist.goBack()} className={styles.goBack}>
        Go Back
      </button>
    </div>
  );
};
