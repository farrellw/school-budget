import * as React from "react";
import { useState } from "react";
import * as savedSchoolsJSON from "../data/savedSchools.json";

function ReportTable() {
    const [selected, setSelected] = useState("HighSchools ( All )");
    // Use the state and functions returned from useTable to build your UI

    const setSelection = (event: React.FormEvent<HTMLSelectElement>) => {
        setSelected(event.currentTarget.value);
    }


    // TODO use a better default
    const formData = (savedSchoolsJSON.find((node) => {
        return node.name === selected;
    }) || savedSchoolsJSON[0]);

    // Render the UI for your table
    return (
        <section className="table-section">
            <select className="table-select" onChange={setSelection}>
                {savedSchoolsJSON.map((n, i: number) => {
                    return (
                        <option key={i} value={n.name} >{n.name}</option>
                    )
                })}
            </select>
            <table>
                <caption>{selected}</caption>
                <thead>
                    <tr>
                        <th>Field Name</th>
                        <th>Non Grant Op Budget</th>
                        <th>Grant Op Budget</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Administrative Salaries</td>
                        <td>{formData["non-grant-operating-budget"]["Administrative Salaries"]}</td>
                        <td>{formData["grant-operating-budget"]["Administrative Salaries"]}</td>
                    </tr>
                    <tr>
                        <td>Instructional Salaries</td>
                        <td>{formData["non-grant-operating-budget"]["Instructional Salaries"]}</td>
                        <td>{formData["grant-operating-budget"]["Instructional Salaries"]}</td>
                    </tr>
                    <tr>
                        <td>Instructional Support Salaries</td>
                        <td>{formData["non-grant-operating-budget"]["Instructional Support Salaries"]}</td>
                        <td>{formData["grant-operating-budget"]["Instructional Support Salaries"]}</td>
                    </tr>
                    <tr>
                        <td>Non-Instructional Support Salaries</td>
                        <td>{formData["non-grant-operating-budget"]["Non-Instructional Support Salaries"]}</td>
                        <td>{formData["grant-operating-budget"]["Non-Instructional Support Salaries"]}</td>
                    </tr>
                    <tr>
                        <td>Temp/Part-Time/Sub</td>
                        <td>{formData["non-grant-operating-budget"]["Temp/Part-Time/Sub"]}</td>
                        <td>{formData["grant-operating-budget"]["Temp/Part-Time/Sub"]}</td>
                    </tr>
                    <tr>
                        <td>Benefits</td>
                        <td>{formData["non-grant-operating-budget"].Benefits}</td>
                        <td>{formData["grant-operating-budget"].Benefits}</td>
                    </tr>
                    <tr>
                        <td>Discretionary Budget</td>
                        <td>{formData["non-grant-operating-budget"]["Discretionary Budget"]}</td>
                        <td>{formData["grant-operating-budget"]["Discretionary Budget"]}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default ReportTable;
