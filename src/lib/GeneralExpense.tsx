import * as React from "react";
import { useState } from "react";
import {
  ITableData,
  ISchool,
  ITableRow,
  ViewByOption,
  averageSchoolFunction
} from "../models/Data";
import { SeriesBarOptions } from "highcharts";
import Chart from "./Chart";
import Table from "./Table";
import "./GeneralExpense.scss";
import averageExpenses from "../data/SchoolAverages.json";
import ViewOptions from "./ViewOptions";
import { rows, colors } from "../models/GeneralExpenseConstants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faCircle
} from '@fortawesome/free-solid-svg-icons';


library.add(faCircle);

interface IProps {
  schools: ISchool[];
  categoryClickHandler: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
  category: string;
}

function GeneralExpense({ schools, categoryClickHandler, category }: IProps) {
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
    avgOrTotal(viewByOption)(school)
  );

  const selectedTypes = selectedSchools.map(s => s.type);

  const selectedAverages = averageExpenses
    .filter(avgExp => {
      return compareWithAverage && selectedTypes.includes(avgExp.type);
    })
    .map(school => avgOrTotal(viewByOption)(school));

  const combinedSchoolsAndAverages = selectedSchools.concat(selectedAverages);

  const getValue = (val: string): string => {
    return "$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const headers = ["Category"].concat(
    combinedSchoolsAndAverages.map(n => n.name)
  );

  // Compute chart data to display
  const series: SeriesBarOptions[] = combinedSchoolsAndAverages.map((s, i) => {
    return {
      type: "bar",
      name: headers[i + 1],
      data: rows.map(r => {
        return (Math.round(s.expenses[r.key] * 100) / 100)
      }),
      color: colors[i]
    };
  });

  // Compute table data to display
  const caption = `General Expenses`;

  const tableData: ITableRow[] = rows.map(
    (row: ITableData): ITableRow => {
      return {
        ...row,
        values: combinedSchoolsAndAverages.map((n): string => {
          if (viewByOption === "Total") {
            return getValue(n.expenses[row.key].toString());
          } else {
            return getValue(n.expenses[row.key].toFixed(2));
          }
        }),
        selected: row.label === category
      };
    }
  );

  return (
    <section>
      <div className="panel">
        <div className="card key">
          <h3>Key</h3>
          <ul>
            {schools.map((n, j: number) => {
              return <li key={j}><FontAwesomeIcon icon="circle" color={colors[j]} />{n.name}</li>;
            })}
          </ul>
        </div>
        <div className="chart-container card">
          <ViewOptions
            onCompareWithAverageChange={handleCompareWithAverageChange}
            onToggleChange={handleViewByOptionChange}
            toggle={viewByOption}
            compareWithAverage={compareWithAverage}
          />
          <Chart rows={rows} series={series} caption={caption} />
        </div>
      </div>
      <div className="panel">
        <Table
          headers={headers}
          clickHandler={categoryClickHandler}
          caption={caption}
          rows={tableData}
        />
      </div>
    </section>
  );
}

export default GeneralExpense;
