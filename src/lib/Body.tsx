import * as React from "react";
import { ISchool } from "../models/Data";
import SchoolInformationSlider from "./SchoolInformationSlider";
import GeneralExpense from "./expenses/GeneralExpense";

type Props = { schools: ISchool[] };
function Body({ schools }: Props) {

  return (
    <main className="body">
      <SchoolInformationSlider schools={schools} />
      {schools.length > 0 && (
        <GeneralExpense
          schools={schools}
        />
      )}
    </main>
  );
}

export default Body;
