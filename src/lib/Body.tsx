import * as React from "react";
import * as schoolExpenses from "../data/SchoolExpenses.json";
import { IGeneralSchoolExpense } from "../models/Data";
import { rows } from "../models/GeneralExpenseConstants";
import ExpenseTable from "./ExpenseTable";
import { subCategoryExpenseData, subCategoryTableData } from '../models/FakeSubCategory';

function Body() {
  const selectedIds: string[] = ["1", "2"];
  const selectedCat: string = "Administrative Salaries";

  const selectedSchools: IGeneralSchoolExpense[] = schoolExpenses.filter(school => {
    return selectedIds.includes(school.id);
  });

  return (
    <section className="expenses">
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
