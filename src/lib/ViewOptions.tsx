import * as React from "react";
import "./ViewOptions.scss";

interface IProps {
  toggle: string;
  compareWithAverage: boolean;
  onToggleChange: () => void;
  onCompareWithAverageChange: () => void;
}

function ViewOptions({
  toggle,
  compareWithAverage,
  onToggleChange,
  onCompareWithAverageChange
}: IProps) {
  return (
    <div className="displayOptions">
      <label>
        <input
          type="radio"
          value="Total"
          checked={toggle === "Total"}
          onChange={onToggleChange}
        />
        Total
      </label>
      <label>
        <input
          type="radio"
          value="Per Student"
          checked={toggle === "Per Student"}
          onChange={onToggleChange}
        />
        Per Student
      </label>
      <label>
        <input
          type="checkbox"
          checked={compareWithAverage}
          onChange={onCompareWithAverageChange}
        />
        Compare against Average
      </label>
    </div>
  );
}

export default ViewOptions;
