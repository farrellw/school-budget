import * as React from "react";
import { useState } from "react";
import * as schoolExpenses from "../data/SchoolExpenses.json";
import { IGeneralSchoolExpense } from "../models/Data";
import { rows } from "../models/GeneralExpenseConstants";
import GeneralExpense from "./GeneralExpense";
import CategoryExpense from './CategoryExpense';
import {
  subCategoryExpenseData,
  subCategoryTableData
} from "../models/FakeSubCategory";
import Switch from "react-switch";

function Body() {
  const [toggle, setToggle] = useState("Total");
  const [selectedCategory, setSelectedCategory] = useState("");

  const retrieveIds = (location: Location): string[] => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.getAll("id") || [];
  }

  const selectedIds: string[] = retrieveIds(window.location)

  const selectedSchools: IGeneralSchoolExpense[] = schoolExpenses
    .filter(school => {
      return selectedIds.includes(school.id);
    })
    .map(school => {
      if (toggle !== "Total") {
        const averagedSchool = {
          ...school,
          administrativeSalaries:
            school.administrativeSalaries / school.projectedEnrollment,
          instructionalSalaries:
            school.instructionalSalaries / school.projectedEnrollment,
          instructionalSupportSalaries:
            school.instructionalSupportSalaries / school.projectedEnrollment,
          nonInstructionalSupportSalaries:
            school.nonInstructionalSupportSalaries / school.projectedEnrollment,
          temp: school.temp / school.projectedEnrollment,
          benefits: school.benefits / school.projectedEnrollment,
          transportation: school.transportation / school.projectedEnrollment,
          discretionary: school.discretionary / school.projectedEnrollment
        };
        return averagedSchool;
      } else {
        return school;
      }
    });

  const handleChange = () => {
    if (toggle === "Total") {
      setToggle("Per Student")
    } else {
      setToggle("Total");
    }
  };

  const clickEvent = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>): void => {
    setSelectedCategory(event.currentTarget.id)
  }

  return (
    <section className="body">
      <div>
        <label>
          <span>Total</span>
          <Switch onChange={handleChange} checked={toggle === "Per Student"} uncheckedIcon={false} checkedIcon={false} offColor={"#34baeb"} onColor={"#a2eb34"} />
          <span>Per Student</span>
        </label>
      </div>
      <GeneralExpense selectedSchools={selectedSchools}
        headers={["Field Name"].concat(selectedSchools.map(n => n.name))}
        rows={rows}
        caption={`General Expenses ( ${toggle} )`} clickHandler={clickEvent} toggle={toggle} category={selectedCategory} />
      {selectedCategory && selectedCategory !== "" && (
        <CategoryExpense
          selectedSchools={selectedIds.map(n => subCategoryExpenseData)}
          headers={["Field Name"].concat(selectedSchools.map(n => n.name))}
          rows={subCategoryTableData}
          caption={`${selectedCategory} ( ${toggle} )`}
        />
      )}
    </section>
  );
}

export default Body;
