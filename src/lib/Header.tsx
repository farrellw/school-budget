import * as React from "react";
import Search from "./Search";
import "./Header.scss";
import { ISchool } from "src/models/Data";

type Props = { schools: ISchool[] };
function Header({ schools }: Props) {
  return (
    <>
      <header className="header">
        <h1>SLPS Budget</h1>
      </header>
      {schools.length <= 0 && <Search />}
    </>
  );
}

export default Header;
