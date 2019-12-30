import React from "react";
import "./Icon.scss";

type Props = { type: "close" };
function Icon({ type }: Props) {
  switch (type) {
    case "close":
      return <span className="icon close"></span>;
  }
}

export default Icon;
