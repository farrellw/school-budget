import * as React from "react";
import * as revenueJSON from "../data/revenue.json";
import DoughnutChart from './DoughnutChart';

function Revenue() {
    return (
        <section className="revenue-section">
            <div className="by-source">
                <DoughnutChart id={"revenue-readout"} data={revenueJSON.bySource} title="Revenue by source" />
            </div>
            <div className="by-category" />
        </section>
    )
}

export default Revenue;

