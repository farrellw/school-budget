import * as React from "react";
import { useState } from "react";
import * as allSchoolsJSON from "../data/allSchools.json";
import { ITableData, SchoolExpenseDataKey, ISchoolExpenseData, FilterType } from 'src/models/Data.js';

function ReportTable() {
    const [selected, setSelected] = useState("Clyde Miller Career Academy");
    const [filter, setFiltered] = useState<FilterType>("All");

    // Use the state and functions returned from useTable to build your UI

    const setSelection = (event: React.FormEvent<HTMLSelectElement>) => {
        setSelected(event.currentTarget.value);
    }

    const setFilter = (event: React.FormEvent<HTMLSelectElement>) => {
        switch(event.currentTarget.value){
            case "All":
            case "HS":
            case "MS":
            case "ES":
                setFiltered(event.currentTarget.value);
            break;
            default:
                setFiltered("All"); 
        }
    }

    const filteredSchools: ITableData[] = allSchoolsJSON.filter((n) => {
        if(filter === "All"){ return true }
        return n.type === filter
    });

    const formData: ITableData = (filteredSchools.find((node) => {
        return node.name === selected;
    }) || filteredSchools[0]);

    const getValue = (tabData: ITableData, grantOp: boolean, field: SchoolExpenseDataKey) => {
        if(grantOp){
            return subBudgetRetrieval(tabData["grant-operating-budget"], field);
        } else {
            return subBudgetRetrieval(tabData["non-grant-operating-budget"], field);
        }
    }
    
    const subBudgetRetrieval = (tabData: ISchoolExpenseData | undefined, field: SchoolExpenseDataKey) => {
        if(tabData && tabData[field]){
            return tabData[field];
        } else {
            return "";
        }
    }

    return (
        <section className="table-section">
            <div className="selects-container">
                <select className="table-select" onChange={setFilter}>
                    <option value={"All"} >All</option>
                    <option value={"HS"} >High</option>
                    <option value={"MS"} >Middle</option>
                    <option value={"ES"} >Elementary</option>
                </select>
                <select className="table-select" onChange={setSelection}>
                    {filteredSchools.map((n, i: number) => {
                        return (
                            <option key={i} value={n.name} >{n.name}</option>
                        )
                    })}
                </select>
            </div>
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
                        <td>{getValue(formData, false, "Administrative Salaries")}</td>
                        <td>{getValue(formData, true, "Administrative Salaries")}</td>
                    </tr>
                    <tr>
                        <td>Instructional Salaries</td>
                        <td>{getValue(formData, false, "Instructional Salaries")}</td>
                        <td>{getValue(formData, true, "Instructional Salaries")}</td>
                    </tr>
                    <tr>
                        <td>Instructional Support Salaries</td>
                        <td>{getValue(formData, false, "Instructional Support Salaries")}</td>
                        <td>{getValue(formData, true, "Instructional Support Salaries")}</td>
                    </tr>
                    <tr>
                        <td>Non-Instructional Support Salaries</td>
                        <td>{getValue(formData, false, "Non-Instructional Support Salaries")}</td>
                        <td>{getValue(formData, true, "Non-Instructional Support Salaries")}</td>
                    </tr>
                    <tr>
                        <td>Temp/Part-Time/Sub</td>
                        <td>{getValue(formData, false, "Temp/Part-Time/Sub")}</td>
                        <td>{getValue(formData, true, "Temp/Part-Time/Sub")}</td>
                    </tr>
                    <tr>
                        <td>Benefits</td>
                        <td>{getValue(formData, false, "Benefits")}</td>
                        <td>{getValue(formData, true, "Benefits")}</td>
                    </tr>
                    <tr>
                        <td>Discretionary Budget</td>
                        <td>{getValue(formData, false, "Discretionary Budget")}</td>
                        <td>{getValue(formData, true, "Discretionary Budget")}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default ReportTable;
