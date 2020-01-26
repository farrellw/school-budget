import * as React from "react";
import Search from "./Search";
import "./Header.scss";
import { ISchool } from "src/models/Data";

type Props = { schools: ISchool[] };
function Header({ schools }: Props) {
  return (
    <>
      <header className="main-header">
        <h1>SLPS BUDGET</h1>
      </header>
      {<Search selectedSchools={schools}/>}
    </>
  );
}

export default Header;
