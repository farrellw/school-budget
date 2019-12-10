import * as React from "react";
import * as schoolExpenses from "../data/SchoolExpenses.json";
import { ISchoolExpense } from "src/models/Data.js";

function ExpenseSection() {
    const selectedIds: string[] = ["1", "2"];

  const selectedSchools: ISchoolExpense[] = schoolExpenses.filter(school => {
    return selectedIds.includes(school.id);
  });

  const getValue = (val: number): string => {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
  }

  return (
    <section className="general-expenses">
      <table>
        <caption>General Expenses</caption>
        <thead>
          <tr>
            <th>Field Name</th>
            {selectedSchools.map((n, i: number) => {
              return <th key={i}>{n.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Administrative Salaries</td>
            {selectedSchools.map((n, i: number) => {
              return <td key={i}>{getValue(n.administrativeSalaries)}</td>;
            })}
          </tr>
          <tr>
            <td>Instructional Salaries</td>
            {selectedSchools.map((n, i: number) => {
              return <td key={i}>{getValue(n.instructionalSalaries)}</td>;
            })}
          </tr>
          <tr>
            <td>Instructional Support Salaries</td>
            {selectedSchools.map((n, i: number) => {
              return <td key={i}>{getValue(n.instructionalSupportSalaries)}</td>;
            })}
          </tr>
          <tr>
            <td>Non-Instructional Support Salaries</td>
            {selectedSchools.map((n, i: number) => {
              return <td key={i}>{getValue(n.nonInstructionalSupportSalaries)}</td>;
            })}
          </tr>
          <tr>
            <td>Temp/Part-Time/Sub</td>
            {selectedSchools.map((n, i: number) => {
              return <td key={i}>{getValue(n.temp)}</td>;
            })}
          </tr>
          <tr>
            <td>Benefits</td>
            {selectedSchools.map((n, i: number) => {
              return <td key={i}>{getValue(n.benefits)}</td>;
            })}
          </tr>
          <tr>
            <td>Discretionary Budget</td>
            {selectedSchools.map((n, i: number) => {
              return <td key={i}>{getValue(n.discretionary)}</td>;
            })}
          </tr>
        </tbody>
      </table>
      <div>
        <p>Chart here</p>
      </div>
    </section>
  );
}

export default ExpenseSection;
