import * as React from "react";
import Select, { ValueType } from "react-select";
import schools from "../data/SchoolExpenses.json";
import { ISchool } from "src/models/Data.js";
import { useHistory } from "react-router-dom";
import { Card, CardContent } from "./Card";
import "./Search.scss";
import * as Url from "../utils/Url";

interface IOption {
  value: string;
  label: string;
}


function isOption(option: ValueType<IOption>): option is IOption {
  return Boolean(option) && (option as IOption).value !== undefined;
}

interface IProps {
  selectedSchools: ISchool[];
}

function Search({selectedSchools}: IProps) {
  const history = useHistory();

  const selectedIds = selectedSchools.map(s => s.id);

  function notAlreadySelected(school: any): boolean {
    return !selectedIds.find(schoolId => schoolId === school.id);
  }

  function onSchoolSelected(id: string) {
    const updatedSelectedIds = Url.addId(selectedIds, id);
    const queryString = Url.toQueryString(updatedSelectedIds);
    history.push(`?${queryString}`);
  }

  const schoolsForComparison: ISchool[] = schools.filter(notAlreadySelected);
  const options: IOption[] = schoolsForComparison.map((school: ISchool) => ({
    value: school.id,
    label: school.name
  }));

  function selectSchool(option: ValueType<IOption>) {
    if (isOption(option)) {
      onSchoolSelected(option.value);
    }
  }

  return (
    <div className="search">
      <Card>
        <CardContent>
          <label>
            Find your school:
            <Select options={options} onChange={selectSchool} />
          </label>
        </CardContent>
      </Card>
    </div>
  );
}

export default Search;
