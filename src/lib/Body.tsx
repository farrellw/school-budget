import * as React from "react";
import { useState } from "react";
import { ISchool } from "../models/Data";
import SchoolInformationSlider from "./SchoolInformationSlider";
import GeneralExpense from "./expenses/GeneralExpense";
import CategoryExpense from "./expenses/CategoryExpense";

type Props = { schools: ISchool[] };
function Body({ schools }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryClickEvent = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ): void => {
    setSelectedCategory(event.currentTarget.id);
  };

  return (
    <main className="body">
      <SchoolInformationSlider schools={schools} />
      {schools.length > 0 && (
        <GeneralExpense
          schools={schools}
          categoryClickHandler={categoryClickEvent}
          category={selectedCategory}
        />
      )}
      {selectedCategory && selectedCategory !== "" && (
        <div className="expense-panel">
          <CategoryExpense category={selectedCategory} schools={schools} />
        </div>
      )}
    </main>
  );
}

export default Body;
