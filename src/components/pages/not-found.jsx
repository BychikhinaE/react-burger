import React from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found.module.css';
import pageNotFound from "../images/404.svg";

export const NotFound404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* <img alt="page not found" src={pageNotFound} /> */}
        <br />
        <Link to='/' className={styles.link}>Перейти в список чатов</Link>
      </div>
    </div>
  );
};
{/* <iframe src="https://assets.pinterest.com/ext/embed.html?id=316729786296705243"
height="359" width="345" frameborder="0" scrolling="no" ></iframe> */}
