import * as React from "react";
import Search from "./Search";
import "./Header.scss";

function Header() {
  return (
    <header className="sb-header">
      <h1 className="sb-heading1">School Budget</h1>
      <nav></nav>
      <Search />
    </header>
  );
}

export default Header;
