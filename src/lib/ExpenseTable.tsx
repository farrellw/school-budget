import * as React from "react";
import { ITableData, SchoolExpense } from "../models/Data";

interface IProps {
  selectedSchools: SchoolExpense[];
  headers: string[];
  rows: ITableData[];
  caption: string;
}

function ExpenseTable({ selectedSchools, headers, rows, caption }: IProps) {
  const getValue = (val: number): string => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <section className="expense-section">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {
              headers.map((n, i) => {
                return <th key={i}>{n}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {rows.map((row: ITableData, i: number) => {
            return (
              <tr key={i}>
                <td>{row.label}</td>
                {selectedSchools.map((n, j: number) => {
                  return <td key={j}>{getValue(n[row.key])}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <p>Chart here</p>
      </div>
    </section>
  );
}

export default ExpenseTable;
