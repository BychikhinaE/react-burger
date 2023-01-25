import styles from "./bun-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BUN_POSITION } from "../../utils/constants";
import { FC } from "react";
import { IItemConstructorProps } from "../../services/types/data";

//Компонент для булочек, отображается в конструкторе
const BunConstructor: FC<
  IItemConstructorProps & { position: "top" | "bottom" }
> = ({ item, position, isLocked }) => {
  let halfBun = "";
  if (position === BUN_POSITION.TOP) {
    halfBun = " (верх)";
  }
  if (position === BUN_POSITION.BOTTOM) {
    halfBun = " (низ)";
  }

  return (
    <li className={`${styles.item} text`}>
      <div className={styles.emptyIcon}></div>
      <ConstructorElement
        type={position}
        isLocked={isLocked}
        text={`${item.name}${halfBun}`}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
};

export default BunConstructor;
