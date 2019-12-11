import * as React from "react";
import { ITableData, SchoolExpense } from "../models/Data";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface IProps {
  selectedSchools: SchoolExpense[];
  headers: string[];
  rows: ITableData[];
  caption: string;
  clickHandler?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
}

function ExpenseTable({ selectedSchools, headers, rows, caption, clickHandler }: IProps) {
  const getValue = (val: number): string => {
    return val.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
    series: selectedSchools.map((s,i) => {
      return {
        type: "bar",
        name: headers[i + 1],
        data: rows.map(r => {
          return s[r.key];
        }
        )
    }}) 
  };

  return (
    <section className="expense-section">
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
          {rows.map((row: ITableData, i: number) => {
            return (
              <tr key={i} onClick={clickHandler} id={row.label}>
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
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </section>
  );
}

export default ExpenseTable;
