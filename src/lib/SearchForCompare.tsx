import * as React from "react";
import Select, { ValueType } from "react-select";
import { ISchool } from "src/models/Data.js";
import { Card, CardContent } from "./Card";
import "./Search.scss";

interface IOption {
  value: string;
  label: string;
}

function isOption(option: ValueType<IOption>): option is IOption {
  return Boolean(option) && (option as IOption).value !== undefined;
}

type Props = {
  schools: ISchool[];
  onSchoolSelected: (id: string) => void;
  onClose: () => void;
};
function SearchForCompare({ onClose, schools, onSchoolSelected }: Props) {
  function selectSchool(option: ValueType<IOption>) {
    if (isOption(option)) {
      onSchoolSelected(option.value);
    }
  }

  const options: IOption[] = schools.map((school: ISchool) => ({
    value: school.id,
    label: school.name
  }));

  return (
    <div className="search">
      <Card onClose={onClose}>
        <CardContent>
          <label>
            Find the school to compare:
            <Select options={options} onChange={selectSchool} />
          </label>
        </CardContent>
      </Card>
    </div>
  );
}

export default SearchForCompare;
