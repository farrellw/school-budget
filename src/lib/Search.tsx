import * as React from "react";
import Select from "react-select";
import schools from "../data/SchoolExpenses.json";
import { IGeneralSchoolExpense } from "src/models/Data.js";

interface IOption {
  value: string;
  label: string;
}
const options: IOption[] = schools.map((school: IGeneralSchoolExpense) => ({
  value: school.id,
  label: school.name
}));

function selectSchool(option: IOption) {
  // TODO: use react router instead.
  window.location.href = `/?id=${option.value}`;
}

function Search() {
  return (
    <>
      <Select options={options} onChange={selectSchool} />
    </>
  );
}

export default Search;
