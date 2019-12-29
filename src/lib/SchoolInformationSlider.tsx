import React from "react";
import "./SchoolInformationSlider.scss";
import SchoolInformation from "./SchoolInformation";
import { IGeneralSchoolExpense } from "src/models/Data";

type Props = { schools: IGeneralSchoolExpense[] };

function SchoolInformationSlider({ schools }: Props) {
  return (
    <div className="school-information-panel">
      <button type="button">Add school to compare</button>
      <div>
        {schools.map(school => (
          <SchoolInformation school={school} />
        ))}
      </div>
    </div>
  );
}

export default SchoolInformationSlider;
