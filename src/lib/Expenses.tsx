import * as React from "react";
import { useState } from "react";
import GeneralExpense from "./GeneralExpense";
import CategoryExpense from "./CategoryExpense";
import {
  subCategoryExpenseData,
  subCategoryTableData
} from "../models/FakeSubCategory";
import { ISchool } from "../models/Data";
import "./Expenses.scss";

interface IProps {
  schools: ISchool[];
}

function Expenses({ schools }: IProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const clickEvent = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ): void => {
    setSelectedCategory(event.currentTarget.id);
  };

  return (
    <div>
      <div className="expense-panel">
        <GeneralExpense
          schools={schools}
          categoryClickHandler={clickEvent}
          category={selectedCategory}
        />
      </div>
      <div className="expense-panel">
        {selectedCategory && selectedCategory !== "" && (
          <CategoryExpense
            selectedSchools={schools.map(n => subCategoryExpenseData)}
            headers={["Field Name"].concat(schools.map(n => n.name))}
            rows={subCategoryTableData}
            caption={`${selectedCategory} ( potato )`}
          />
        )}
      </div>
    </div>
  );
}

export default Expenses;
