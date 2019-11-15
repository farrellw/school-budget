import * as React from "react";
import { useState } from "react";
import Revenue from './Revenue';

interface IProps { message: string };

type ShowOptions = "Revenue" | "Expenses";

function Report({ message }: IProps) {
  const [show, setShow] = useState<ShowOptions>("Revenue");

  const showRevenue = () => {
    setShow("Revenue");
  }

  const showExpenses = () => {
    setShow("Expenses");
  }

  let showReport;

  if (show === "Revenue") {
    showReport = <Revenue />
  } else if (show === "Expenses") {
    showReport = <Revenue />
  }

  return (
    <div className="report">
      <section className="report-container">
        <div className="report_header">
          <h1 className="report-title">
            Mock SLPS Dashboard View
            </h1>
        </div>
        <div className="button-container">
          <button onClick={showRevenue}>Revenue</button>
          <button onClick={showExpenses}>Expenses</button>
        </div>
        {showReport}
      </section>
    </div>
  )
}

export default Report;