import * as React from "react";
import { useState } from "react";
import * as schoolExpenses from "../data/SchoolExpenses.json";
import * as averageExpenses from "../data/SchoolAverages.json";
import { rows } from "../models/GeneralExpenseConstants";
import GeneralExpense from "./GeneralExpense";
import CategoryExpense from "./CategoryExpense";
import {
  subCategoryExpenseData,
  subCategoryTableData
} from "../models/FakeSubCategory";
import {
  ISchool,
  averageSchoolFunction
} from "../models/Data";

interface IProps {
  selectedIds: string[];
  toggle: string;
  compareWithAverage: boolean;
}

function Expenses({ selectedIds, toggle, compareWithAverage }: IProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const selectedSchools: ISchool[] = schoolExpenses
    .filter(school => {
      return selectedIds.includes(school.id);
    })
    .map(school => {
      if (toggle !== "Total") {
        const averagedSchool = averageSchoolFunction(school);
        return averagedSchool;
      } else {
        return school;
      }
    });

  if (compareWithAverage) {
    const selectedTypes = selectedSchools.map(s => s.type);
    const selectedAverages = averageExpenses.filter(avgExp => {
      return selectedTypes.includes(avgExp.type);
    });
    selectedAverages.forEach(selectedAverage => {
      if (toggle !== "Total") {
        const averagedExpenses = averageSchoolFunction(selectedAverage);
        selectedSchools.push(averagedExpenses);
      } else {
        selectedSchools.push(selectedAverage);
      }
    });
  }

  const clickEvent = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ): void => {
    setSelectedCategory(event.currentTarget.id);
  };

  return (
    <div>
      <GeneralExpense
        selectedSchools={selectedSchools}
        headers={["Field Name"].concat(selectedSchools.map(n => n.name))}
        rows={rows}
        caption={`General Expenses ( ${toggle} )`}
        clickHandler={clickEvent}
        toggle={toggle}
        category={selectedCategory}
      />
      {selectedCategory && selectedCategory !== "" && (
        <CategoryExpense
          selectedSchools={selectedIds.map(n => subCategoryExpenseData)}
          headers={["Field Name"].concat(selectedSchools.map(n => n.name))}
          rows={subCategoryTableData}
          caption={`${selectedCategory} ( ${toggle} )`}
        />
      )}
    </div>
  );
}

export default Expenses;
