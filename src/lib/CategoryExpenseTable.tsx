import * as React from "react";
import { ITableData, SchoolExpense, ITableRow } from "../models/Data";
import * as Highcharts from "highcharts";
import Table from './Table';
import Chart from "./Chart";

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
})

interface IProps {
    selectedSchools: SchoolExpense[];
    headers: string[];
    rows: ITableData[];
    caption: string;
    clickHandler?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
}

function CategoryExpenseTable({ selectedSchools, headers, rows, caption, clickHandler }: IProps) {
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

    const rowData: ITableRow[] = rows.map((row: ITableData) => {
        return {
            ...row,
            values: selectedSchools.map((): string => {
                return "????";
            })
        }
    })

    return (
        <section className="expense-section">
            <Table headers={headers} caption={caption} clickHandler={clickHandler} rows={rowData} />
            <Chart series={series} rows={rows} caption={caption} />
        </section>
    );
}

export default CategoryExpenseTable;
