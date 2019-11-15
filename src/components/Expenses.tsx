import * as React from "react";
import * as expensesJSON from "../data/expenses.json";
import DoughnutChart from './DoughnutChart';

function Expenses() {
    return (
        <section className="expenses-section">
            <div className="doughnut-chart-container">
                <DoughnutChart id={"expense-readout-source"} data={expensesJSON.gob} title="General Operating Budget" />
            </div>
        </section>
    )
}

export default Expenses;

