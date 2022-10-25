import React, { useEffect, useRef, useMemo } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./all-current-orders.module.css";
import { Link, useLocation, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";


function OrderPreview(item) {
  const dispatch = useDispatch();



  return (

      <Link className={styles.item} to='/feed/:id'>
      <div className={`${styles.number}`}></div>
      <div className={`${styles.time}`}></div>
      <h2 className={`${styles.header}`}>header</h2>
      <div className={`${styles.images}`}></div>
      <div className={`${styles.total}`}></div>
      </Link>

  );
};

export default OrderPreview;
