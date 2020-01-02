import * as React from "react";
import { useState } from "react";
import {
  ITableData,
  ISchool,
  ITableRow,
  TotalOrPerStudent,
  averageSchoolFunction
} from "../models/Data";
import * as Highcharts from "highcharts";
import Chart from "./Chart";
import Table from "./Table";
import "./GeneralExpense.scss";
import averageExpenses from "../data/SchoolAverages.json";
import ViewOptions from "./ViewOptions";
import { rows } from "../models/GeneralExpenseConstants";

interface IProps {
  schools: ISchool[];
  categoryClickHandler?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
  category: string;
}

function Expense({ schools, categoryClickHandler, category }: IProps) {
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

  const avgOrTotal = (tog: string): ((school: ISchool) => ISchool) => {
    return (school: ISchool) => {
      if (tog !== "Total") {
        return averageSchoolFunction(school);
      } else {
        return school;
      }
    };
  };

  const selectedSchools: ISchool[] = schools.map(school =>
    avgOrTotal(toggle)(school)
  );

  const selectedTypes = selectedSchools.map(s => s.type);

  const selectedAverages = averageExpenses
    .filter(avgExp => {
      return compareWithAverage && selectedTypes.includes(avgExp.type);
    })
    .map(school => avgOrTotal(toggle)(school));

  const combinedSchoolsAndAverages = selectedSchools.concat(selectedAverages);

  const getValue = (val: string): string => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const headers = ["Field Name"].concat(
    combinedSchoolsAndAverages.map(n => n.name)
  );

  const series: Highcharts.SeriesOptionsType[] = combinedSchoolsAndAverages.map(
    (s, i) => {
      return {
        type: "bar",
        name: headers[i + 1],
        data: rows.map(r => {
          return Math.round(s.expenses[r.key] * 100) / 100;
        })
      };
    }
  );

  // Compute table data to display
  const enrollmentRow: ITableRow = {
    label: "Enrollment",
    values: combinedSchoolsAndAverages.map(n =>
      n.projectedEnrollment.toString()
    )
  };
  const tableData: ITableRow[] = [enrollmentRow].concat(
    rows.map(
      (row: ITableData, i: number): ITableRow => {
        return {
          ...row,
          values: combinedSchoolsAndAverages.map((n, j: number): string => {
            if (toggle === "Total") {
              return getValue(n.expenses[row.key].toString());
            } else {
              return getValue(n.expenses[row.key].toFixed(2));
            }
          }),
          selected: row.label === category
        };
      }
    )
  );

  const caption = `General Expenses ( ${toggle} )`;

  return (
    <section className="card">
      <div>
        <ViewOptions
          onCompareWithAverageChange={handleCompareWithAverageChange}
          onToggleChange={handleToggleChange}
          toggle={toggle}
          compareWithAverage={compareWithAverage}
        />
      </div>
      <div className="expense-section">
        <Table
            headers={headers}
            clickHandler={categoryClickHandler}
            caption={caption}
            rows={tableData}
        />
        <Chart rows={rows} series={series} caption={caption} />
      </div>
    </section>
  );
}

export default Expense;
