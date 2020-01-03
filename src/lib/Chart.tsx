import * as React from "react";
import * as Highcharts from "highcharts";
import { ITableData } from "../models/Data";
import HC_exporting from "highcharts/modules/exporting";
import HC_noDataToDisplay from "highcharts/modules/no-data-to-display";
import HighchartsReact from "highcharts-react-official";

HC_exporting(Highcharts);
HC_noDataToDisplay(Highcharts);
Highcharts.setOptions({
  lang: {
    thousandsSep: ","
  }
});

interface IProps {
  caption: string;
  rows: ITableData[];
  series: Highcharts.SeriesOptionsType[];
}

function Chart({ caption, rows, series }: IProps) {
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
      y: 120,
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
    tooltip: {
      pointFormat: "Value: {point.y:,.2f} $"
    },
    lang: {
      noData: "Chart Unavailable because data has not been released"
    },
    series,
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030"
      }
    }
  };

  return (
    <div className="chart-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default Chart;
