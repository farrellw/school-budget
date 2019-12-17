import * as React from "react";
import Select from "react-select";
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

function Search() {
  const history = useHistory();

  function selectSchool(option: IOption) {
    history.push(`/?id=${option.value}`);
  }

  return (
    <>
      <Select options={options} onChange={selectSchool} />
    </>
  );
}

export default Search;
