import * as React from "react";
import { useState } from "react";
import averageExpenses from "../data/SchoolAverages.json";
import {
  averageSchoolFunction,
  TotalOrPerStudent,
  IGeneralSchoolExpense
} from "../models/Data";
import { rows } from "../models/GeneralExpenseConstants";
import GeneralExpense from "./GeneralExpense";
import CategoryExpense from "./CategoryExpense";
import {
  subCategoryExpenseData,
  subCategoryTableData
} from "../models/FakeSubCategory";
import Switch from "react-switch";
import SchoolInformationSlider from "./SchoolInformationSlider";

type Props = { schools: IGeneralSchoolExpense[] };
function Body({ schools }: Props) {
  const [toggle, setToggle] = useState<TotalOrPerStudent>("Total");
  const [compareWithAverage, setCompareWthAverage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const schoolExpenses = schools.map(school => {
    if (toggle !== "Total") {
      const averagedSchool = averageSchoolFunction(school);
      return averagedSchool;
    } else {
      return school;
    }
  });

  if (compareWithAverage) {
    const selectedTypes = schoolExpenses.map(s => s.type);
    const selectedAverages = averageExpenses.filter(avgExp => {
      return selectedTypes.includes(avgExp.type);
    });
    selectedAverages.forEach(selectedAverage => {
      if (toggle !== "Total") {
        schoolExpenses.push(averageSchoolFunction(selectedAverage));
      } else {
        schoolExpenses.push(selectedAverage);
      }
    });
  }

  const handleChange = () => {
    if (toggle === "Total") {
      setToggle("Per Student");
    } else {
      setToggle("Total");
    }
  };

  const handleCompareWithAverageChange = () => {
    setCompareWthAverage(!compareWithAverage);
  };

  const generalExpenseClickHandler = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ): void => {
    setSelectedCategory(event.currentTarget.id);
  };

  return (
    <main className="body">
      <SchoolInformationSlider schools={schoolExpenses} />
      <div className="displayOptions">
        <label>
          <span>Total</span>
          <Switch
            onChange={handleChange}
            checked={toggle === "Per Student"}
            uncheckedIcon={false}
            checkedIcon={false}
            offColor={"#34baeb"}
            onColor={"#a2eb34"}
          />
          <span>Per Student</span>
        </label>
        <label>
          <Switch
            onChange={handleCompareWithAverageChange}
            checked={compareWithAverage}
          />
          <span>Compare Against Average</span>
        </label>
      </div>
      <GeneralExpense
        selectedSchools={schoolExpenses}
        headers={["Field Name"].concat(schoolExpenses.map(n => n.name))}
        rows={rows}
        caption={`General Expenses ( ${toggle} )`}
        clickHandler={generalExpenseClickHandler}
        toggle={toggle}
        category={selectedCategory}
      />
      {selectedCategory && selectedCategory !== "" && (
        <CategoryExpense
          selectedSchools={schoolExpenses.map(school => subCategoryExpenseData)}
          headers={["Field Name"].concat(schoolExpenses.map(n => n.name))}
          rows={subCategoryTableData}
          caption={`${selectedCategory} ( ${toggle} )`}
        />
      )}
    </main>
  );
}

export default Body;
