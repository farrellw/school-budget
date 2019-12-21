import * as React from "react";
import { useState } from "react";
import { TotalOrPerStudent } from "../models/Data";
import Switch from "react-switch";
import { useLocation } from "react-router-dom";
import Expenses from "./Expenses";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Body() {
  const [toggle, setToggle] = useState<TotalOrPerStudent>("Total");
  const [compareWithAverage, setCompareWthAverage] = useState(false);
  
  const query = useQuery();
  const selectedIds: string[] = query.getAll("id");

  const handleChange = () => {
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
      <Expenses selectedIds={selectedIds} compareWithAverage={compareWithAverage} toggle={toggle}/>
    </section>
  );
}

export default Body;
