import * as React from "react";
import Select from "react-select";
import schools from "../data/SchoolExpenses.json";
import { ISchool } from "src/models/Data.js";
import { useHistory } from "react-router-dom";

interface IOption {
  value: string;
  label: string;
}
const options: IOption[] = schools.map((school: ISchool) => ({
  value: school.id,
  label: school.name
}));

function Search() {
  const history = useHistory();

  function selectSchool(selectedOptions: IOption[]) {
    if(selectedOptions){
      const queryString = selectedOptions.map(o => {
        return `id=${o.value}`;
      }).join("&");
  
      history.push(`/?${queryString}`);
    } else {
      history.push("/");
    }
  }

  return (
    <>
      <Select options={options} onChange={selectSchool} isMulti={true}/>
    </>
  );
}

export default Search;
