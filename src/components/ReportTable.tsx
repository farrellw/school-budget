import * as React from "react";
import { useState } from "react";
import * as savedSchoolsJSON from "../data/savedSchools.json";

function ReportTable() {
    const [selected, setSelected] = useState("HighSchools ( All )");
    // Use the state and functions returned from useTable to build your UI

    const setSelection = (event: React.FormEvent<HTMLSelectElement>) => {
        setSelected(event.currentTarget.value);
    }

    const formData = (savedSchoolsJSON.find((node) => {
        return node.name === selected;
    }) || savedSchoolsJSON[0])["non-grant-operating-budget"];

    // Render the UI for your table
    return (
        <section className="table">
            <select onChange={setSelection}>
                {savedSchoolsJSON.map((n, i: number) => {
                    return (
                        <option key={i} value={n.name} >{n.name}</option>
                    )
                })}
            </select><br />
            <table >
                <caption>{selected}</caption>
                <thead>
                    <tr>
                        <th>Field Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Administrative Salaries</td>
                        <td>{formData["Administrative Salaries"]}</td>
                    </tr>
                    <tr>
                        <td>Instructional Salaries</td>
                        <td>{formData["Instructional Salaries"]}</td>
                    </tr>
                    <tr>
                        <td>Instructional Support Salaries</td>
                        <td>{formData["Instructional Support Salaries"]}</td>
                    </tr>
                    <tr>
                        <td>Non-Instructional Support Salaries</td>
                        <td>{formData["Non-Instructional Support Salaries"]}</td>
                    </tr>
                    <tr>
                        <td>Temp/Part-Time/Sub</td>
                        <td>{formData["Temp/Part-Time/Sub"]}</td>
                    </tr>
                    <tr>
                        <td>Benefits</td>
                        <td>{formData.Benefits}</td>
                    </tr>
                    <tr>
                        <td>Discretionary Budget</td>
                        <td>{formData["Discretionary Budget"]}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default ReportTable;
