import * as React from "react";
import { useState } from "react";
import { TotalOrPerStudent } from "../models/Data";
import { useLocation } from "react-router-dom";
import Expenses from "./Expenses";
import ViewOptions from './ViewOptions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Body() {
  const [toggle, setToggle] = useState<TotalOrPerStudent>("Total");
  const [compareWithAverage, setCompareWthAverage] = useState(false);
  
  const query = useQuery();
  const selectedIds: string[] = query.getAll("id");

  const handleToggleChange = () => {
    if (toggle === "Total") {
      setToggle("Per Student");
    } else {
      setToggle("Total");
    }
  };

  const handleCompareWithAverageChange = () => {
    setCompareWthAverage(!compareWithAverage);
  }

  return (
    <section className="body">
      <ViewOptions onCompareWithAverageChange={handleCompareWithAverageChange} onToggleChange={handleToggleChange} toggle={toggle} compareWithAverage={compareWithAverage}/>
      <Expenses selectedIds={selectedIds} compareWithAverage={compareWithAverage} toggle={toggle}/>
    </section>
  );
}

export default Body;
