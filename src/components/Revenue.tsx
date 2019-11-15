import * as React from "react";
import * as revenueJSON from "../data/revenue.json";
import DoughnutChart from './DoughnutChart';

function Revenue() {
    return (
        <section className="revenue-section">
            <div className="by-source doughnut-chart-container">
                <DoughnutChart id={"revenue-readout-source"} data={revenueJSON.bySource} title="Revenue by source" />
            </div>
            <div className="by-category doughnut-chart-container">
                <DoughnutChart id={"revenue-readout-category"} data={revenueJSON.byCategory} title="Revenue by category" />
            </div>
        </section>
    )
}

export default Revenue;

