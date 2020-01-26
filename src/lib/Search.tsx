import * as React from "react";
import Select, { ValueType } from "react-select";
import schools from "../data/SchoolExpenses.json";
import { ISchool } from "src/models/Data.js";
import { useHistory } from "react-router-dom";
import { Card, CardContent } from "./Card";
import * as Url from "../utils/Url";
import "./Search.scss";

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

function Search({ selectedSchools }: IProps) {
  const history = useHistory();

  const selectedIds = selectedSchools.map(s => {
    return {
      value: s.id,
      label: s.name
    };
  });

  const isDisabled = () => {
    return selectedIds.length >= 5;
  };

  function notAlreadySelected(school: any): boolean {
    return !selectedIds.find(schoolId => schoolId === school.id);
  }

  const schoolsForComparison: ISchool[] = schools.filter(notAlreadySelected);
  const options: IOption[] = schoolsForComparison.map((school: ISchool) => ({
    value: school.id,
    label: school.name
  }));

  // TODO how to get any out of this function
  function selectSchool(selectedOptions: any) {
    if (selectedOptions) {
      const selectedIds = selectedOptions
        .filter((o: IOption) => isOption(o))
        .map((o: IOption) => o.value);
      const queryString = Url.toQueryString(selectedIds);

      history.push(`?${queryString}`);
    } else {
      history.push("");
    }
  }

  return (
    <div className="search">
      <Card>
        <CardContent>
          <label>
            Select a school ( Maximum of 5):
            <Select options={options} onChange={selectSchool} isMulti={true} isOptionDisabled={isDisabled} value={selectedIds}/>
          </label>
          {/* <button onClick={resetAll}>Reset All</button> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default Search;
