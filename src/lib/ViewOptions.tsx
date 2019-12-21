import * as React from "react";
import Switch from "react-switch";

interface IProps {
    toggle: string;
    compareWithAverage: boolean;
    onToggleChange: () => void
    onCompareWithAverageChange: () => void
}


function ViewOptions({toggle, compareWithAverage, onToggleChange, onCompareWithAverageChange}: IProps) {
  return (
    <div className="displayOptions">
      <label>
        <span>Total</span>
        <Switch
          onChange={onToggleChange}
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
          onChange={onCompareWithAverageChange}
          checked={compareWithAverage}
        />
        <span>Compare Against Average</span>
      </label>
    </div>
  );
}

export default ViewOptions;
