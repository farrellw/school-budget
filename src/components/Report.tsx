import * as React from "react";
import * as revenueJSON from "../data/revenue.json"

interface IProps { message: string };

function Report({ message }: IProps) {
  console.log(revenueJSON);

  return (
    <div className="report">
      <section className="report-container">
        <div className="report_header">
          {/* <img className="result-logo" src={logo} alt="Logo" /> */}
          <h1 className="report-title">
            Mock SLPS Dashboard View
            </h1>
        </div>
        <div className="button-container">
          <button>Revenue</button>
          <button>Expenses</button>
        </div>
        {/* <ScoreReadout score={score} />
          <ScoreChart score={score} industryScore={industryScore} />
          <NextSteps
            organizationScore={organizationScore}
            score={score}
            showDataEngineering={showDataEngineering}
            showDecisionScience={showDecisionScience}
          />
          {submissionID != undefined && (
            <SaveResult submissionID={submissionID} email={submission.email} />
          )} */}
      </section>
    </div>
  )
}

export default Report;