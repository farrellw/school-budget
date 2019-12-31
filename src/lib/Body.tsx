import * as React from "react";
import { useState } from "react";
import { TotalOrPerStudent } from "../models/Data";
import { useLocation } from "react-router-dom";
import Expenses from "./Expenses";
import ViewOptions from './ViewOptions';
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
  
  const query = useQuery();
  const selectedIds: string[] = query.getAll("id");

  const handleToggleChange = () => {
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

  return (
    <main className="body">
      <SchoolInformationSlider schools={schools} />
      <ViewOptions onCompareWithAverageChange={handleCompareWithAverageChange} onToggleChange={handleToggleChange} toggle={toggle} compareWithAverage={compareWithAverage}/>
      <Expenses selectedIds={selectedIds} compareWithAverage={compareWithAverage} toggle={toggle}/>
    </main>
  );
}

export default Body;
