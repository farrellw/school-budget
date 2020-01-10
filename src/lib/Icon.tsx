import React from "react";
import "./Icon.scss";

type Props = { type: "close" | "add" | "delete" };
function Icon({ type }: Props) {
  switch (type) {
    case "close":
      return <span className="icon close"></span>;
    case "add":
      return <span className="icon add"></span>;
    case "delete":
      return <span className="icon delete"></span>;
  }
}

export default Icon;
