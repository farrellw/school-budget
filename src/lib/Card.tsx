import * as React from "react";
import "./Card.scss";
import Button from "./Button";
import Icon from "./Icon";

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

export function CardHeader({ children, className = "" }: Props) {
  return <div className={`${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: Props) {
  return <div className={`${className} content`}>{children}</div>;
}

type CardProps = Props & { onClose?: () => void };
export function Card({ children, className = "", onClose }: CardProps) {
  return (
    <div className={`${className} card`}>
      {onClose && (
        <Button type="image" title="Close" className="close" onClick={onClose}>
          <Icon type="close" />
        </Button>
      )}
      {children}
    </div>
  );
}
