import * as React from "react";
import { useState } from "react";
import {
  ITableData,
  ISchool,
  ITableRow,
  TotalOrPerStudent
} from "../models/Data";
import * as Highcharts from "highcharts";
import Table from "./Table";
import Chart from "./Chart";
import ViewOptions from "./ViewOptions";
import { subCategoryTableData } from "../models/FakeSubCategory";

interface IProps {
  schools: ISchool[];
  category: string;
}

function CategoryExpense({ schools, category }: IProps) {
  const [toggle, setToggle] = useState<TotalOrPerStudent>("Total");
  const [compareWithAverage, setCompareWthAverage] = useState(false);

  const handleToggleChange = () => {
    if (toggle === "Total") {
      setToggle("Per Student");
    } else {
      setToggle("Total");
    }
  };

  const handleCompareWithAverageChange = () => {
    setCompareWthAverage(!compareWithAverage);
  };

  const headers = ["Field Name"].concat(schools.map(n => n.name));
  const rows = subCategoryTableData;
  const caption = `${category} ( ${toggle} )`;

  const series: Highcharts.SeriesOptionsType[] = schools.map((s, i) => {
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
        onToggleChange={handleToggleChange}
        toggle={toggle}
        compareWithAverage={compareWithAverage}
      />
      <div className="expense-section ">
        <Table headers={headers} caption={caption} rows={rowData} />
        <Chart series={series} rows={rows} caption={caption} />
      </div>
    </section>
  );
}

export default CategoryExpense;
