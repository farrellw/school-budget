import * as React from "react";
import { useState } from "react";
import * as schoolExpenses from "../data/SchoolExpenses.json";
import { IGeneralSchoolExpense } from "../models/Data";
import { rows } from "../models/GeneralExpenseConstants";
import ExpenseTable from "./ExpenseTable";
import { subCategoryExpenseData, subCategoryTableData } from '../models/FakeSubCategory';
import Switch from "react-switch";

function Body() {
  const [toggle, setToggle] = useState(false);
  // TODO set these based on URL Parameters.
  const selectedIds: string[] = ["1", "2"];
  const selectedCat: string = "Administrative Salaries";

  const selectedSchools: IGeneralSchoolExpense[] = schoolExpenses.filter(school => {
    return selectedIds.includes(school.id);
  }).map(school => {
    if(toggle){
      school.administrativeSalaries = (school.administrativeSalaries / school.projectedEnrollment);
      school.instructionalSalaries = school.instructionalSalaries / school.projectedEnrollment;
      school.instructionalSupportSalaries = school.instructionalSupportSalaries / school.projectedEnrollment;
      school.nonInstructionalSupportSalaries = school.nonInstructionalSupportSalaries / school.projectedEnrollment;
      school.temp = school.temp / school.projectedEnrollment;
      school.benefits = school.benefits / school.projectedEnrollment;
      school.transportation = school.transportation / school.projectedEnrollment;
      school.discretionary = school.discretionary / school.projectedEnrollment;
      return school;
    } else {
      return school;
    }
  })

  const handleChange = () => {
    setToggle(!toggle);
  }


  return (
    <section className="body">
      <div>
      <label>
        <span>Total</span>
        <Switch onChange={handleChange} checked={toggle} />
        <span>Per Student</span>
      </label>
      </div>
      <ExpenseTable
        selectedSchools={selectedSchools}
        headers={["Field Name"].concat(selectedSchools.map(n => n.name))}
        rows={rows}
        caption="General Expenses"
      />
      {selectedCat && selectedCat !== "" && (
        <ExpenseTable
          selectedSchools={selectedIds.map((n) => subCategoryExpenseData)}
          headers={["Field Name"].concat(selectedSchools.map(n => n.name))}
          rows={subCategoryTableData}
          caption={selectedCat}
        />
      )}
    </section>
  );
}

export default Body;
