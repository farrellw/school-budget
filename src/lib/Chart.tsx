import * as React from "react";
import * as Highcharts from "highcharts";
import { ITableData } from "../models/Data";
import HC_exporting from "highcharts/modules/exporting";
import HC_noDataToDisplay from "highcharts/modules/no-data-to-display";
import HighchartsReact from "highcharts-react-official";
import { colors } from "src/models/GeneralExpenseConstants";

HC_exporting(Highcharts);
HC_noDataToDisplay(Highcharts);
Highcharts.setOptions({
  lang: {
    thousandsSep: ","
  },
  colors: colors
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
      text: caption + " (Graph View)"
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
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      x: 0,
      y: 100,
      borderWidth: 1,
      backgroundColor:
        (Highcharts.defaultOptions.legend &&
          Highcharts.defaultOptions.legend.backgroundColor) ||
        "#FFFFFF",
      shadow: true,
      enabled: false
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

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default Chart;
