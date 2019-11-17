import * as React from "react";
import * as exampleForJSON from "../data/exampleForForm.json";


function ReportTable() {
    // Use the state and functions returned from useTable to build your UI
    
    // Render the UI for your table
    return (
        <table >
            <tr>
                <th>Field Name</th>
                <th>Value</th>
            </tr>
            { exampleForJSON["non-grant-operating-budget"].map((n, i: number) => {
                return (
                    <tr key={i}>
                        <td>{n.field}</td>
                        <td>{n.value}</td>
                    </tr>
                )
            })}
        </table>
    )
}

export default ReportTable;
