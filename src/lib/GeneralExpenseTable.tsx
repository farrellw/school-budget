import * as React from "react";
import { ITableData, IGeneralSchoolExpense, ITableRow } from "../models/Data";
import * as Highcharts from "highcharts";
import HC_exporting from 'highcharts/modules/exporting'
HC_exporting(Highcharts)
import HighchartsReact from "highcharts-react-official";

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

    const options: Highcharts.Options = {
        exporting: {
            chartOptions: { // specific options for the exported image
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                }
            },
            fallbackToExportServer: false
        },
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
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </section>
    );
}

export default ExpenseTable;
