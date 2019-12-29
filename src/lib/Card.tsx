import * as React from "react";
import "./Card.scss";

type Props = { children: JSX.Element | JSX.Element[]; className?: string };
function Card({ children, className = "" }: Props) {
  return <div className={`${className} card`}>{children}</div>;
}

export default Card;
