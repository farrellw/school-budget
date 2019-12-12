import * as React from "react";
import { ITableData, IGeneralSchoolExpense, ITableRow } from "../models/Data";
import * as Highcharts from "highcharts";
import Chart from "./Chart";
import Table from "./Table";

interface IProps {
    selectedSchools: IGeneralSchoolExpense[];
    headers: string[];
    rows: ITableData[];
    caption: string;
    toggle: string;
    clickHandler?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
}

function ExpenseTable({ selectedSchools, headers, rows, caption, clickHandler, toggle }: IProps) {
    const getValue = (val: string): string => {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const series: Highcharts.SeriesOptionsType[] = selectedSchools.map((s, i) => {
        return {
            type: "bar",
            name: headers[i + 1],
            data: rows.map(r => {
                return s[r.key];
            }
            )
        }
    })

    // Compute table data to display
    const tableData: ITableRow[] = rows.map((row: ITableData, i: number): ITableRow => {
        return {
            ...row,
            values: selectedSchools.map((n, j: number): string => {
                if (toggle === "Total") {
                    return getValue(n[row.key].toString())
                } else {
                    return getValue(n[row.key].toFixed(2))
                }
            })
        }
    })

    return (
        <section className="expense-section">
            <Table headers={headers} clickHandler={clickHandler} caption={caption} rows={tableData} />
            <Chart rows={rows} series={series} caption={caption} />
        </section>
    );
}

export default ExpenseTable;
