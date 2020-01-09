import React, { useState } from "react";
import "./SchoolInformationSlider.scss";
import SchoolInformation from "./SchoolInformation";
import { ISchool } from "src/models/Data";
import Button from "./Button";
import Icon from "./Icon";
import SearchForCompare from "./SearchForCompare";
import allSchools from "../data/SchoolExpenses.json";
import * as Url from "../utils/Url";
import { useHistory } from "react-router-dom";

type Props = { schools: ISchool[] };

function SchoolInformationSlider({ schools }: Props) {
  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();

  const selectedIds = schools.map(s => s.id);

  function notAlreadySelected(school: any): boolean {
    return !selectedIds.find(schoolId => schoolId === school.id);
  }

  function onSchoolSelected(id: string) {
    const updatedSelectedIds = Url.addId(selectedIds, id);
    const queryString = Url.toQueryString(updatedSelectedIds);
    history.push(`?${queryString}`);
    setShowSearch(false);
  }

  function onSchoolClose(schoolId: string) {
    const schoolIds = Url.removeId(
      schools.map(s => s.id),
      schoolId
    );
    if (schoolIds.length <= 0) {
      setShowSearch(false);
    }
    const queryString = Url.toQueryString(schoolIds);
    history.push(`?${queryString}`);
  }

  const schoolsForComparison: ISchool[] = allSchools.filter(notAlreadySelected);

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
      {showSearch && (
        <SearchForCompare
          schools={schoolsForComparison}
          onSchoolSelected={onSchoolSelected}
          onClose={() => setShowSearch(false)}
        />
      )}
      {schools.map(school => (
        <SchoolInformation
          school={school}
          schools={schools}
          onClose={onSchoolClose}
        />
      ))}
    </div>
  );
}

export default SchoolInformationSlider;
