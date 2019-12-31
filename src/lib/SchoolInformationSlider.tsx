import React, { useState } from "react";
import "./SchoolInformationSlider.scss";
import SchoolInformation from "./SchoolInformation";
import { IGeneralSchoolExpense } from "src/models/Data";
import Button from "./Button";
import Icon from "./Icon";
import Search from "./Search";

type Props = { schools: IGeneralSchoolExpense[] };

function SchoolInformationSlider({ schools }: Props) {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="school-information-panel">
      {schools.length > 0 && (
        <Button
          type="default"
          onClick={() => {
            setShowSearch(true);
          }}
        >
          <Icon type="add"></Icon>
          Add school to compare
        </Button>
      )}
      <div>
        {showSearch && <Search></Search>}
        {schools.map(school => (
          <SchoolInformation school={school} schools={schools} />
        ))}
      </div>
    </div>
  );
}

export default SchoolInformationSlider;