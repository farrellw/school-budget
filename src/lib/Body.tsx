import * as React from "react";
import Expenses from "./Expenses";
import {
  ISchool
} from "../models/Data";
import SchoolInformationSlider from "./SchoolInformationSlider";

type Props = { schools: ISchool[] };
function Body({ schools }: Props) {

  return (
    <main className="body">
      <SchoolInformationSlider schools={schools} />
      <Expenses schools={schools} />
    </main>
  );
}

export default Body;
