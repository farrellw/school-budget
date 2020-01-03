import React, { useState } from "react";
import "./SchoolInformationSlider.scss";
import SchoolInformation from "./SchoolInformation";
import { ISchool } from "src/models/Data";
import Button from "./Button";
import Icon from "./Icon";
import Search from "./Search";

type Props = { schools: ISchool[] };

function SchoolInformationSlider({ schools }: Props) {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="school-information-slider">
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
      {showSearch && <Search></Search>}
      {schools.map(school => (
        <SchoolInformation school={school} schools={schools} />
      ))}
    </div>
  );
}

export default SchoolInformationSlider;
