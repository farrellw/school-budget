import * as React from "react";
import { ITableRow } from "../models/Data";

interface IProps {
  headers: string[];
  rows: ITableRow[];
  caption: string;
  clickHandler?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
}

function Table({ headers, rows, caption, clickHandler }: IProps) {
  return (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {headers.map((n, i) => {
            return <th key={i}>{n}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: ITableRow, i: number) => {
          return (
            <tr
              key={i}
              onClick={clickHandler}
              id={row.label}
              className={row.selected ? "selected" : ""}
            >
              <td>{row.label}</td>

              {row.values.map((n, j: number) => {
                return <td key={j}>{n}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
