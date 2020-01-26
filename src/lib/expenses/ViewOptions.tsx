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
      <div className="radio-toolbar">
        <span>View by:</span>
          <input
            id="radio1"
            type="radio"
            value="Total"
            checked={toggle === "Total"}
            onChange={onToggleChange}
          />
          <label htmlFor="radio1">
          Total
        </label>
          <input
            type="radio"
            value="Per Student"
            id="radio2"
            checked={toggle === "Per Student"}
            onChange={onToggleChange}
          />
          <label htmlFor="radio2">
          Per Student
        </label>
      </div>
      <div className="checkbox-toolbar">
        <label>
          <input
            type="checkbox"
            checked={compareWithAverage}
            onChange={onCompareWithAverageChange}
          />
          Compare against Average
        </label>
      </div>
    </div>
  );
}

export default ViewOptions;
