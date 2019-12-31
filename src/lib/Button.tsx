import React from "react";
import "./Button.scss";

type Type = "image" | "primary" | "default";
type Props = {
  className?: string;
  type?: Type;
  title?: string;
  children: JSX.Element | (JSX.Element | string)[] | string;
  onClick?: () => void;
};
function Button({
  className = "",
  type = "default",
  title,
  children,
  onClick
}: Props) {
  switch (type) {
    case "image":
      return (
        <button
          type="button"
          className={`${className} image`}
          title={title}
          onClick={onClick}
        >
          {children}
        </button>
      );

    case "primary":
      return (
        <button
          type="button"
          className={`${className} primary`}
          title={title}
          onClick={onClick}
        >
          {children}
        </button>
      );
    case "default":
      return (
        <button
          type="button"
          className={`${className} default`}
          title={title}
          onClick={onClick}
        >
          {children}
        </button>
      );
  }
}

export default Button;
