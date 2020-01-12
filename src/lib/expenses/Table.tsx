import * as React from "react";
import { ITableRow } from "../../models/Data";
import "./Table.scss";
import { colors } from "../../models/GeneralExpenseConstants";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faCircle
} from '@fortawesome/free-solid-svg-icons';


library.add(faCircle);

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
    <div className="card">
      <table>
        <caption>{caption} ( Table View )</caption>
        <thead>
          <tr>
            {headers.map((n, i) => {
              if(i !== 0){
                return <th key={i}><FontAwesomeIcon icon="circle" color={colors[i - 1]} /><div>{n}</div></th>;
              } else {
                return <th key={i}><div>{n}</div></th>;
              }
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
    </div>
  );
}

export default Table;
