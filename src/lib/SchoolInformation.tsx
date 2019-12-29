import React from "react";
import "./SchoolInformation.scss";
import { IGeneralSchoolExpense } from "src/models/Data";

type Props = { school: IGeneralSchoolExpense };
function SchoolInformation({ school }: Props) {
  return (
    <div className="school-information">
      <h2>{school.name}</h2>
      <dl>
        <dt>Zip Code</dt>
        <dd>63108</dd>
        <dt>Principal</dt>
        <dd>Dr. Rick Marshall</dd>
        <dt>Vice Principal</dt>
        <dd>Dr. Seuss</dd>
      </dl>
    </div>
  );
}

export default SchoolInformation;
