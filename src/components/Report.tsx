import * as React from "react";
import Revenue from './Revenue';

interface IProps { message: string };

function Report({ message }: IProps) {
  return (
    <div className="report">
      <section className="report-container">
        <div className="report_header">
          <h1 className="report-title">
            Mock SLPS Dashboard View
            </h1>
        </div>
        <div className="button-container">
          <button>Revenue</button>
          <button>Expenses</button>
        </div>
        <Revenue />
      </section>
    </div>
  )
}

export default Report;