import * as React from "react";
import Body from "./lib/Body";
import Header from "./lib/Header";
import "./App.scss";
import { useLocation } from "react-router-dom";
import schoolExpenses from "./data/SchoolExpenses.json";
import { IGeneralSchoolExpense } from "./models/Data";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const query = useQuery();
  const selectedIds: string[] = query.getAll("id");
  const selectedSchools: IGeneralSchoolExpense[] = schoolExpenses.filter(
    school => selectedIds.includes(school.id)
  );

  return (
    <>
      <Header schools={selectedSchools} />
      <Body schools={selectedSchools} />
    </>
  );
}

export default App;
