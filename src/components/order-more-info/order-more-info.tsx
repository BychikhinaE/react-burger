import styles from "./order-more-info.module.css";
import { useSelector } from "../../services/hooks/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams, useLocation } from "react-router-dom";
import { formatHumanDate } from "../../utils/utils";
import { IIngredient } from "../../services/types/data";
import { IOrder, TLocation } from "../../services/types/data";

function OrderMoreInfo() {
  const location = useLocation<TLocation>();
  const orders = useSelector((state) => state.ws.orders);
  const allIngredients = useSelector((state) => state.menu.items);
  const { id } = useParams<{ id: string }>();

  const order: IOrder | undefined = orders?.find((item: IOrder) => item._id === id);
  // if (!order) {
  //   return;
  // }
  const orderNumber: string | undefined  = order?.number.toString();
type TIngredientQuantyty = IIngredient  & {quantity: number}
  //Сделаем новый массив ингредиентов в заказе в котором в объектах будет кол-во повторений этого ингредиента
  const orderIngrCount: Array<TIngredientQuantyty> = allIngredients.reduce(
    (prevVal: Array<TIngredientQuantyty>, item: IIngredient) => {
      order?.ingredients.forEach((id) => {
        const itemInNewArr = prevVal.find((item) => item._id === id);
        if (item._id === id) {
          if (!itemInNewArr) {
            prevVal.push({
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: 1,
              _id: item._id,
            });
          } else {
            itemInNewArr.quantity++;
          }
          return prevVal;
        }
      });
      return prevVal;
    },
    []
  );

  const background = location.state?.background;
  //Считаем сумму заказа
  const total = () => {
    return orderIngrCount.reduce(
      (acc: number, item: TIngredientQuantyty) => acc + item.price * item.quantity,
      0
    );
  };

  //Здесь меняем текст статуса и его цвет
  let status = "";
  let colorStatus: string | undefined = undefined;

  switch (order?.status) {
    case "done":
      status = "Выполнен";
      colorStatus = styles.done;
      break;
    case "pending":
      status = "Готовится";
      colorStatus = styles.pending;
      break;
    case "created":
      status = "Создан";
      colorStatus = styles.created;
      break;
    default:
      status = "Отменен";
      colorStatus = styles.cancel;
      break;
  }

  //Положение заголовка? модальное окно или отдельная страница
  const styleModal = background ? styles.header : "";
  return (
    <>
      {order && (
        <>
          <h2 className={`text text_type_digits-default  pb-10 ${styleModal}`}>
            {`#${orderNumber}`}
          </h2>
          <h3 className={`${styles.header} text text_type_main-medium mb-3`}>
            {order.name}
          </h3>
          <p
            className={`${styles.status} ${colorStatus} text text_type_main-default`}
          >
            {status}
          </p>
          <h4
            className={`${styles.header} text text_type_main-medium mt-15 mb-6`}
          >
            Состав:
          </h4>

          <ul className={`${styles.scroll} custom-scroll text`}>
            {orderIngrCount.map((item, index) => (
              <li key={index} className={`${styles.item} text`}>
                <div className={styles.imageBorder}>
                  <img
                    alt={item.name}
                    src={item.image}
                    className={styles.image}
                  />
                </div>

                <p className="text text_type_main-default pl-5">{item.name}</p>
                <div className={styles.price}>
                  <p className="text text_type_digits-default mr-1">
                    {item.quantity} x {item.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
          </ul>
          <div className={`${styles.footer} mt-10`}>
            <p
              className={`${styles.timestamp}text text_type_main-default text_color_inactive `}
            >
              {formatHumanDate(order)}
            </p>
            <p className={`${styles.total} text text_type_digits-default mr-1`}>
              {total}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </>
      )}
    </>
  );
}

export default OrderMoreInfo;
