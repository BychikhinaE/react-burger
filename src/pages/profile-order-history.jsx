import React from "react";
import { Link, useLocation } from "react-router-dom";
import OrderPreview  from '../components/order-preview/order-preview'
// import styles from "./profile.module.css";
// Клик по заказу в «Истории заказов» переносит пользователя на экран /profile/orders/:id.
export function ProfileОrderHistory() {
  const myOrders = []
  const location = useLocation
return (
  <ul>
  {myOrders.map((item) => (
       <Link
       to='/profile/orders/:id'
       >
       <OrderPreview item={item} />
     </Link>
  ))}

  </ul>

)
}
