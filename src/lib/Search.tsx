import * as React from "react";
import Select, { ValueType } from "react-select";
import schools from "../data/SchoolExpenses.json";
import { IGeneralSchoolExpense } from "src/models/Data.js";
import { useHistory } from "react-router-dom";

interface IOption {
  value: string;
  label: string;
}
const options: IOption[] = schools.map((school: IGeneralSchoolExpense) => ({
  value: school.id,
  label: school.name
}));

function isOption(option: ValueType<IOption>): option is IOption {
  return Boolean(option) && (option as IOption).value !== undefined;
}

function isMultipleOptions(option: ValueType<IOption>): option is IOption[] {
  return Boolean(option) && (option as IOption[]) !== undefined;
}

function Search() {
  const history = useHistory();

  function selectSchool(option: ValueType<IOption>) {
    if (isOption(option)) {
      history.push(`?id=${option.value}`);
    } else if (isMultipleOptions(option)) {
      const queryString = option.map(o => `id=${o.value}`).join("&");
      history.push(`?${queryString}`);
    } else {
      history.push("");
    }
  }

  return (
    <>
      <label>
        Find your school:
        <Select options={options} onChange={selectSchool} />
      </label>
    </>
  );
}

export default Search;
