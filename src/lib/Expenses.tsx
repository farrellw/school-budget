import * as React from "react";
import { useState } from "react";
import averageExpenses from "../data/SchoolAverages.json";
import { rows } from "../models/GeneralExpenseConstants";
import GeneralExpense from "./GeneralExpense";
import CategoryExpense from "./CategoryExpense";
import {
  subCategoryExpenseData,
  subCategoryTableData
} from "../models/FakeSubCategory";
import { ISchool, averageSchoolFunction } from "../models/Data";
import "./Expenses.scss";

interface IProps {
  schools: ISchool[];
  toggle: string;
  compareWithAverage: boolean;
}

function Expenses({ schools, toggle, compareWithAverage }: IProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const clickEvent = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ): void => {
    setSelectedCategory(event.currentTarget.id);
  };

  return (
    <div>
      <div className="expense-panel">
        <GeneralExpense
          selectedSchools={combinedSchoolsAndAverages}
          headers={["Field Name"].concat(
            combinedSchoolsAndAverages.map(n => n.name)
          )}
          rows={rows}
          caption={`General Expenses ( ${toggle} )`}
          clickHandler={clickEvent}
          toggle={toggle}
          category={selectedCategory}
        />
      </div>
      <div className="expense-panel">
        {selectedCategory && selectedCategory !== "" && (
          <CategoryExpense
            selectedSchools={schools.map(n => subCategoryExpenseData)}
            headers={["Field Name"].concat(selectedSchools.map(n => n.name))}
            rows={subCategoryTableData}
            caption={`${selectedCategory} ( ${toggle} )`}
          />
        )}
      </div>
    </div>
  );
}

export default Expenses;
