import { ITableData } from './Data';

export const rows: ITableData[] = [
    { label: "Total", key: "total" },
    { label: "Administrative Salaries", key: "administrativeSalaries" },
    { label: "Instructional Salaries", key: "instructionalSalaries" },
    {
        label: "Instructional Support Salaries",
        key: "instructionalSupportSalaries"
    },
    {
        label: "Non Instructional Support Salaries",
        key: "nonInstructionalSupportSalaries"
    },
    { label: "Temp", key: "temp" },
    { label: "Benefits", key: "benefits" },
    { label: "Transportation", key: "transportation" },
    { label: "Discretionary", key: "discretionary" }
];

export const colors = ['#92C5DE', '#053061', '#FFD75E', '#FF7E56', '#B2182B', '#ffa600']