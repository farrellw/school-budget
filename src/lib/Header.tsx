import * as React from "react";
import Search from "./Search";
import "./Header.scss";
import { IGeneralSchoolExpense } from "src/models/Data";

type Props = { schools: IGeneralSchoolExpense[] };
function Header({ schools }: Props) {
  return (
    <header className="sb-header">
      <h1 className="sb-heading1">SLPS Budget</h1>
      <nav></nav>
      {schools.length > 0 && <Search />}
    </header>
  );
}

export default Header;
