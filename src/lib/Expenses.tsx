import * as React from "react";
import { useState } from "react";
import GeneralExpense from "./GeneralExpense";
import CategoryExpense from "./CategoryExpense";
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
          category={selectedCategory}
            schools={schools}
          />
        )}
      </div>
    </div>
  );
}

export default Expenses;
