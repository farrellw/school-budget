import * as React from "react";
import { useState } from "react";
import Expenses from "./Expenses";
import ViewOptions from './ViewOptions';
import {
  TotalOrPerStudent,
  ISchool
} from "../models/Data";
import SchoolInformationSlider from "./SchoolInformationSlider";

type Props = { schools: ISchool[] };
function Body({ schools }: Props) {
  const [toggle, setToggle] = useState<TotalOrPerStudent>("Total");
  const [compareWithAverage, setCompareWthAverage] = useState(false);
  
  const handleToggleChange = () => {
    if (toggle === "Total") {
      setToggle("Per Student");
    } else {
      setToggle("Total");
    }
  }

  const handleCompareWithAverageChange = () => {
    setCompareWthAverage(!compareWithAverage);
  };

  return (
    <main className="body">
      <SchoolInformationSlider schools={schools} />
      <ViewOptions onCompareWithAverageChange={handleCompareWithAverageChange} onToggleChange={handleToggleChange} toggle={toggle} compareWithAverage={compareWithAverage}/>
      <Expenses schools={schools} compareWithAverage={compareWithAverage} toggle={toggle}/>
    </main>
  );
}

export default Body;
