import * as React from "react";
import Autosuggest from "react-autosuggest";
import schools from "../data/SchoolExpenses.json";
import { IGeneralSchoolExpense } from "src/models/Data.js";

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value: string) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : schools.filter(school => school.name.toLowerCase().indexOf(value) !== -1);
};

const getSuggestionValue = (suggestion: IGeneralSchoolExpense) =>
  suggestion.name;

const renderSuggestion = (suggestion: IGeneralSchoolExpense) => (
  <div>{suggestion.name}</div>
);

function Search() {
  const [suggestions, setSuggestions] = React.useState<IGeneralSchoolExpense[]>(
    []
  );

  const [value, setValue] = React.useState("");

  const inputProps = {
    placeholder: "Search for school",
    value,
    onChange: (event: React.FormEvent, { newValue }: { newValue: string }) =>
      setValue(newValue)
  };

  const onSuggestionsFetchRequested = ({ value: val }: { value: string }) => {
    setSuggestions(getSuggestions(val));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}

export default Search;
