import React from "react";
import "./Icon.scss";

type Props = { type: "close" | "add" };
function Icon({ type }: Props) {
  switch (type) {
    case "close":
      return <span className="icon close"></span>;
    case "add":
      return <span className="icon add"></span>;
  }
}

export default Icon;
