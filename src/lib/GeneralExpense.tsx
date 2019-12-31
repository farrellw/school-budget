import * as React from "react";
import { ITableData, ISchool, ITableRow } from "../models/Data";
import * as Highcharts from "highcharts";
import Chart from "./Chart";
import Table from "./Table";

interface IProps {
    selectedSchools: ISchool[];
    headers: string[];
    rows: ITableData[];
    caption: string;
    toggle: string;
    clickHandler?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
    category: string;
}

function Expense({ selectedSchools, headers, rows, caption, clickHandler, toggle, category }: IProps) {
    const getValue = (val: string): string => {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const series: Highcharts.SeriesOptionsType[] = selectedSchools.map((s, i) => {
        return {
            type: "bar",
            name: headers[i + 1],
            data: rows.map(r => {
                return Math.round(s.expenses[r.key] * 100) / 100;
            }
            )
        }
    })

    // Compute table data to display
    const enrollmentRow: ITableRow = {
        label: "Enrollment",
        values: selectedSchools.map(n => (n.projectedEnrollment).toString())
    }
    const tableData: ITableRow[] = [enrollmentRow].concat(rows.map((row: ITableData, i: number): ITableRow => {
        return {
            ...row,
            values: selectedSchools.map((n, j: number): string => {
                if (toggle === "Total") {
                    return getValue(n.expenses[row.key].toString())
                } else {
                    return getValue(n.expenses[row.key].toFixed(2))
                }
            }),
            selected: row.label === category
        }
    }))

    return (
        <section className="expense-section">
            <Table headers={headers} clickHandler={clickHandler} caption={caption} rows={tableData} />
            <Chart rows={rows} series={series} caption={caption} />
        </section>
    );
}

export default Expense;