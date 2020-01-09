import * as React from "react";
import { useState } from "react";
import {
  ITableData,
  ISchool,
  ITableRow,
  ViewByOption
} from "../models/Data";
import { SeriesOptionsType } from "highcharts";
import Table from "./Table";
import Chart from "./Chart";
import ViewOptions from "./ViewOptions";
import { subCategoryTableData } from "../models/FakeSubCategory";

interface IProps {
  schools: ISchool[];
  category: string;
}

function CategoryExpense({ schools, category }: IProps) {
  const [viewByOption, setViewByOption] = useState<ViewByOption>("Total");
  const [compareWithAverage, setCompareWthAverage] = useState(false);

  const handleViewByOptionChange = () => {
    if (viewByOption === "Total") {
      setViewByOption("Per Student");
    } else {
      setViewByOption("Total");
    }
  };

  const handleCompareWithAverageChange = () => {
    setCompareWthAverage(!compareWithAverage);
  };

  const headers = ["Field Name"].concat(schools.map(n => n.name));
  const rows = subCategoryTableData;
  const caption = `${category} ( ${viewByOption} )`;

  const series: SeriesOptionsType[] = schools.map((s, i) => {
    return {
      type: "bar",
      name: headers[i + 1],
      data: []
    };
  });

  const rowData: ITableRow[] = rows.map((row: ITableData) => {
    return {
      ...row,
      values: schools.map((): string => {
        return "This Data Has Not Been Shared";
      })
    };
  });

  return (
    <section className="card">
      <ViewOptions
        onCompareWithAverageChange={handleCompareWithAverageChange}
        onToggleChange={handleViewByOptionChange}
        toggle={viewByOption}
        compareWithAverage={compareWithAverage}
      />
      <div className="expense-section ">
        <Table headers={headers} caption={caption} rows={rowData} />
        <div className="chart-container">
          <Chart series={series} rows={rows} caption={caption} />
        </div>
      </div>
    </section>
  );
}

export default CategoryExpense;
