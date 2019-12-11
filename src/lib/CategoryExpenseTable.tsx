import * as React from "react";
import { ITableData, SchoolExpense, ITableRow } from "../models/Data";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Table from './Table';

interface IProps {
    selectedSchools: SchoolExpense[];
    headers: string[];
    rows: ITableData[];
    caption: string;
    clickHandler?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
}

function CategoryExpenseTable({ selectedSchools, headers, rows, caption, clickHandler }: IProps) {
    const options: Highcharts.Options = {
        chart: {
            type: "bar"
        },
        title: {
            text: caption
        },
        xAxis: {
            categories: rows.map(n => n.label)
        },
        yAxis: {
            min: 0,
            title: {
                text: "Dollars",
                align: "high"
            },
            labels: {
                overflow: "justify"
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "top",
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                (Highcharts.defaultOptions.legend &&
                    Highcharts.defaultOptions.legend.backgroundColor) ||
                "#FFFFFF",
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: selectedSchools.map((s, i) => {
            return {
                type: "bar",
                name: headers[i + 1],
                data: rows.map(r => {
                    return s[r.key];
                }
                )
            }
        })
    };

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
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </section>
    );
}

export default CategoryExpenseTable;
